import { useState, useEffect, useCallback } from 'react';
import { FinancialInputs, DEFAULT_INPUTS } from '@/types/presentation';
import { useFinancialCalculator } from '@/hooks/useFinancialCalculator';
import { useScenarios } from '@/hooks/useScenarios';
import { SlideNavigation } from './SlideNavigation';
import { FinancialInputsPanel } from './FinancialInputsPanel';
import { CoverSlide } from './slides/CoverSlide';
import { ProjectSnapshotSlide } from './slides/ProjectSnapshotSlide';
import { GenerationSlide } from './slides/GenerationSlide';
import { CostBreakdownSlide } from './slides/CostBreakdownSlide';
import { AdditionalChargesSlide } from './slides/AdditionalChargesSlide';
import { DebtStructureSlide } from './slides/DebtStructureSlide';
import { EMISummarySlide } from './slides/EMISummarySlide';
import { OpenAccessSlide } from './slides/OpenAccessSlide';
import { RevenueSlide } from './slides/RevenueSlide';
import { TaxBenefitsSlide } from './slides/TaxBenefitsSlide';
import { ProfitabilitySlide } from './slides/ProfitabilitySlide';
import { ROISlide } from './slides/ROISlide';
import { TurnkeyScopeSlide } from './slides/TurnkeyScopeSlide';
import { ConclusionSlide } from './slides/ConclusionSlide';

const SLIDE_NAMES = [
  'Cover', 'Project Snapshot', 'Generation Assumptions', 'Cost Breakup',
  'Additional Charges', 'Debt Structure', 'EMI Summary', 'Open Access Charges',
  'Revenue Estimation', 'Tax Benefits', 'Profitability', 'ROI & Breakeven',
  'Turnkey Scope', 'Conclusion'
];

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inputs, setInputs] = useState<FinancialInputs>(DEFAULT_INPUTS);
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
      <div className="relative h-[calc(100vh-64px)]">
        <CoverSlide isActive={currentSlide === 0} />
        <ProjectSnapshotSlide {...slideProps} isActive={currentSlide === 1} />
        <GenerationSlide {...slideProps} isActive={currentSlide === 2} />
        <CostBreakdownSlide {...slideProps} isActive={currentSlide === 3} />
        <AdditionalChargesSlide {...slideProps} isActive={currentSlide === 4} />
        <DebtStructureSlide {...slideProps} isActive={currentSlide === 5} />
        <EMISummarySlide {...slideProps} isActive={currentSlide === 6} />
        <OpenAccessSlide {...slideProps} isActive={currentSlide === 7} />
        <RevenueSlide {...slideProps} isActive={currentSlide === 8} />
        <TaxBenefitsSlide {...slideProps} isActive={currentSlide === 9} />
        <ProfitabilitySlide {...slideProps} isActive={currentSlide === 10} />
        <ROISlide {...slideProps} isActive={currentSlide === 11} />
        <TurnkeyScopeSlide {...slideProps} isActive={currentSlide === 12} />
        <ConclusionSlide {...slideProps} isActive={currentSlide === 13} />
      </div>
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={SLIDE_NAMES.length}
        slideNames={SLIDE_NAMES}
        onNavigate={setCurrentSlide}
        onPrev={() => setCurrentSlide((p) => Math.max(p - 1, 0))}
        onNext={() => setCurrentSlide((p) => Math.min(p + 1, SLIDE_NAMES.length - 1))}
      />
    </div>
  );
}
