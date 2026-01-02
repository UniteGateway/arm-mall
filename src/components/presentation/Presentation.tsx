import { useState, useEffect, useCallback } from 'react';
import { FinancialInputs, DEFAULT_INPUTS } from '@/types/presentation';
import { useFinancialCalculator } from '@/hooks/useFinancialCalculator';
import { useScenarios } from '@/hooks/useScenarios';
import { SlideNavigation } from './SlideNavigation';
import { FinancialInputsPanel } from './FinancialInputsPanel';
import { CoverSlide } from './slides/CoverSlide';
import { DashboardSlide } from './slides/DashboardSlide';
import { ProjectSnapshotSlide } from './slides/ProjectSnapshotSlide';
import { GenerationSlide } from './slides/GenerationSlide';
import { CostBreakdownSlide } from './slides/CostBreakdownSlide';
import { AdditionalChargesSlide } from './slides/AdditionalChargesSlide';
import { DebtStructureSlide } from './slides/DebtStructureSlide';
import { EMISummarySlide } from './slides/EMISummarySlide';
import { OpenAccessSlide } from './slides/OpenAccessSlide';
import { RevenueSlide } from './slides/RevenueSlide';
import { DepreciationSlide } from './slides/DepreciationSlide';
import { TaxBenefitsSlide } from './slides/TaxBenefitsSlide';
import { LandAppreciationSlide } from './slides/LandAppreciationSlide';
import { ProfitabilitySlide } from './slides/ProfitabilitySlide';
import { ROISlide } from './slides/ROISlide';
import { TurnkeyScopeSlide } from './slides/TurnkeyScopeSlide';
import { ConclusionSlide } from './slides/ConclusionSlide';
import { cn } from '@/lib/utils';

type DeviceView = 'mobile' | 'tablet' | 'desktop';

const SLIDE_NAMES = [
  'Cover', 'Dashboard', 'Project Snapshot', 'Generation Assumptions', 'Cost Breakup',
  'Additional Charges', 'Debt Structure', 'EMI Schedule', 'Open Access Charges',
  'Revenue Estimation', 'Depreciation', 'Tax Benefits', 'Land Appreciation',
  'Profitability', 'ROI & Breakeven', 'Turnkey Scope', 'Conclusion'
];

const deviceWidths: Record<DeviceView, string> = {
  mobile: 'max-w-[375px]',
  tablet: 'max-w-[768px]',
  desktop: 'max-w-full',
};

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inputs, setInputs] = useState<FinancialInputs>(DEFAULT_INPUTS);
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const metrics = useFinancialCalculator(inputs);
  const { scenarios, saveScenario, deleteScenario, loadScenario } = useScenarios();

  const handleInputChange = useCallback((changes: Partial<FinancialInputs>) => {
    setInputs((prev) => ({ ...prev, ...changes }));
  }, []);

  const handleReset = useCallback(() => setInputs(DEFAULT_INPUTS), []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') setCurrentSlide((p) => Math.min(p + 1, SLIDE_NAMES.length - 1));
    if (e.key === 'ArrowLeft') setCurrentSlide((p) => Math.max(p - 1, 0));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const slideProps = { inputs, metrics, onInputChange: handleInputChange, isActive: false };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <FinancialInputsPanel
        inputs={inputs}
        onInputChange={handleInputChange}
        onReset={handleReset}
        scenarios={scenarios}
        onSaveScenario={(name) => saveScenario(name, inputs)}
        onLoadScenario={(s) => setInputs(loadScenario(s))}
        onDeleteScenario={deleteScenario}
      />
      
      {/* Device Preview Container */}
      <div className={cn(
        "relative h-[calc(100vh-64px)] mx-auto transition-all duration-300",
        deviceView !== 'desktop' && 'border-x border-border shadow-lg bg-background',
        deviceWidths[deviceView]
      )}>
        {/* Device Frame Indicator for Mobile/Tablet */}
        {deviceView !== 'desktop' && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-muted rounded-t-lg text-xs text-muted-foreground font-medium">
            {deviceView === 'mobile' ? '📱 Mobile View' : '📱 iPad View'}
          </div>
        )}
        
        <div className="h-full overflow-hidden">
          <CoverSlide isActive={currentSlide === 0} />
          <DashboardSlide {...slideProps} isActive={currentSlide === 1} />
          <ProjectSnapshotSlide {...slideProps} isActive={currentSlide === 2} />
          <GenerationSlide {...slideProps} isActive={currentSlide === 3} />
          <CostBreakdownSlide {...slideProps} isActive={currentSlide === 4} />
          <AdditionalChargesSlide {...slideProps} isActive={currentSlide === 5} />
          <DebtStructureSlide {...slideProps} isActive={currentSlide === 6} />
          <EMISummarySlide {...slideProps} isActive={currentSlide === 7} />
          <OpenAccessSlide {...slideProps} isActive={currentSlide === 8} />
          <RevenueSlide {...slideProps} isActive={currentSlide === 9} />
          <DepreciationSlide {...slideProps} isActive={currentSlide === 10} />
          <TaxBenefitsSlide {...slideProps} isActive={currentSlide === 11} />
          <LandAppreciationSlide {...slideProps} isActive={currentSlide === 12} />
          <ProfitabilitySlide {...slideProps} isActive={currentSlide === 13} />
          <ROISlide {...slideProps} isActive={currentSlide === 14} />
          <TurnkeyScopeSlide {...slideProps} isActive={currentSlide === 15} />
          <ConclusionSlide {...slideProps} isActive={currentSlide === 16} />
        </div>
      </div>
      
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={SLIDE_NAMES.length}
        slideNames={SLIDE_NAMES}
        onNavigate={setCurrentSlide}
        onPrev={() => setCurrentSlide((p) => Math.max(p - 1, 0))}
        onNext={() => setCurrentSlide((p) => Math.min(p + 1, SLIDE_NAMES.length - 1))}
        deviceView={deviceView}
        onDeviceViewChange={setDeviceView}
      />
    </div>
  );
}
