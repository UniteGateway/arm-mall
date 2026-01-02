import { Shield, TrendingDown } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '@/types/presentation';

export function TaxBenefitsSlide({ isActive }: SlideProps) {
  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Tax & Depreciation Benefits
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Significant tax advantages for solar power investments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accelerated Depreciation */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <TrendingDown className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">40%</h3>
            <h4 className="text-lg font-semibold mb-4">Accelerated Depreciation</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Early-year tax shelter benefit
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Reduces effective tax liability significantly
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                Available under Income Tax Act
              </li>
            </ul>
          </div>

          {/* Impact on Returns */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Tax Shield</h3>
            <h4 className="text-lg font-semibold mb-4">Impact on Investment</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                Improves equity cash flow in initial years
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                Enhances project IRR by 2-4%
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                Reduces effective investment cost
              </li>
            </ul>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 p-5 rounded-xl bg-muted/50 border animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Depreciation benefits depend on investor's tax profile and applicable rates. 
            Consult with tax advisors for specific calculations based on individual circumstances.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}
