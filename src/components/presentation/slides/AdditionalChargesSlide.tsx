import { FileCheck, RefreshCw } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '@/types/presentation';

export function AdditionalChargesSlide({ isActive }: SlideProps) {
  const oneTimeCharges = [
    'Open Access Application & Processing Charges',
    'Connectivity & Synchronization Charges',
    'Metering & ABT Compliance Costs',
    'Grid Coordination & SLDC Charges',
  ];

  const recurringCharges = [
    'SLDC Operating Charges (as applicable)',
    'Scheduling & Energy Accounting',
    'Compliance & Reporting Costs',
  ];

  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Additional & Operational Charges
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Non-CAPEX statutory and operational costs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* One-Time Charges */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">One-Time / Statutory</h3>
            </div>
            <div className="space-y-3">
              {oneTimeCharges.map((charge, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-card border hover:shadow-soft transition-shadow"
                >
                  <span className="text-muted-foreground mr-2">•</span>
                  {charge}
                </div>
              ))}
            </div>
          </div>

          {/* Recurring Charges */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10">
                <RefreshCw className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Recurring (Operational)</h3>
            </div>
            <div className="space-y-3">
              {recurringCharges.map((charge, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-card border hover:shadow-soft transition-shadow"
                >
                  <span className="text-muted-foreground mr-2">•</span>
                  {charge}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 rounded-xl bg-muted/50 border-dashed border animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-muted-foreground italic text-center">
            All statutory and operational charges applicable shall be as per prevailing Telangana regulations and DISCOM norms.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}
