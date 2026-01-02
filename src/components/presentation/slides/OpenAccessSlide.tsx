import { AlertTriangle, CheckCircle } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '@/types/presentation';
import { cn } from '@/lib/utils';

export function OpenAccessSlide({ inputs, onInputChange, isActive }: SlideProps) {
  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Open Access Charges (Telangana)
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Two approaches for financial modeling
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A - Estimated */}
          <div
            className={cn(
              'p-6 rounded-xl border-2 cursor-pointer transition-all',
              inputs.oaChargesMode === 'estimated'
                ? 'border-solar-orange bg-solar-orange/5'
                : 'border-border hover:border-muted-foreground/50'
            )}
            onClick={() => onInputChange?.({ oaChargesMode: 'estimated' })}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-solar-orange/10">
                <AlertTriangle className="w-5 h-5 text-solar-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Option A – Estimated</h3>
                <span className="text-sm text-muted-foreground">Financial Sensitivity</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card">
                <span className="text-sm text-muted-foreground">Wheeling & Transmission</span>
                <p className="font-semibold text-lg">₹0.50 – ₹1.20 / unit</p>
                <p className="text-xs text-muted-foreground mt-1">(Indicative Range)</p>
              </div>

              <ul className="text-sm text-muted-foreground space-y-1.5 pl-1">
                <li>• Used only for illustrative modelling</li>
                <li>• Subject to final TSERC tariff order</li>
              </ul>
            </div>

            {inputs.oaChargesMode === 'estimated' && (
              <div className="mt-4 p-3 rounded-lg bg-solar-orange/10 text-sm">
                <span className="font-medium">Current Estimate:</span> ₹{inputs.oaChargesEstimate.toFixed(2)}/unit
              </div>
            )}
          </div>

          {/* Option B - Regulatory */}
          <div
            className={cn(
              'p-6 rounded-xl border-2 cursor-pointer transition-all',
              inputs.oaChargesMode === 'regulatory'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-muted-foreground/50'
            )}
            onClick={() => onInputChange?.({ oaChargesMode: 'regulatory' })}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Option B – Regulatory-Compliant</h3>
                <span className="text-sm text-primary font-medium">RECOMMENDED</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card">
                <span className="text-sm text-muted-foreground">Wheeling, Transmission & OA Charges</span>
                <p className="font-semibold">As per TSERC & DISCOM tariff orders</p>
              </div>

              <ul className="text-sm text-muted-foreground space-y-1.5 pl-1">
                <li>• Finalized at OA approval & PPA execution stage</li>
                <li>• No fixed assumption in base model</li>
                <li>• Fully compliant with regulations</li>
              </ul>
            </div>

            {inputs.oaChargesMode === 'regulatory' && (
              <div className="mt-4 p-3 rounded-lg bg-primary/10 text-sm">
                <span className="font-medium">Mode:</span> Regulatory Compliant (no estimates)
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
