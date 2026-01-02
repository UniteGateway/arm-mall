import { Check, AlertCircle } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '@/types/presentation';
import { cn } from '@/lib/utils';

export function EMISummarySlide({ inputs, metrics, isActive }: SlideProps) {
  const loanYears = inputs.loanTenureMonths / 12;
  
  const emiSummary = [
    { year: 1, emi: metrics.annualEMI, status: 'High EMI Phase' },
    { year: 2, emi: metrics.annualEMI, status: 'Active' },
    { year: 3, emi: metrics.annualEMI, status: 'Mid Loan' },
    { year: 4, emi: metrics.annualEMI, status: 'Active' },
    { year: 5, emi: metrics.annualEMI, status: 'Near Closure' },
    { year: Math.ceil(loanYears), emi: metrics.annualEMI * (loanYears % 1 || 1), status: 'Final' },
  ].slice(0, Math.ceil(loanYears) + 1);

  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          EMI Summary Table
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Annual EMI schedule over {loanYears.toFixed(1)} year tenure
        </p>

        <div className="bg-card rounded-xl border overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-semibold">Year</th>
                <th className="text-right p-4 font-semibold">Annual EMI (₹ Cr)</th>
                <th className="text-left p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {emiSummary.map((row, index) => (
                <tr
                  key={index}
                  className={cn(
                    'border-t transition-colors',
                    index === emiSummary.length - 1 && 'bg-primary/5'
                  )}
                >
                  <td className="p-4 font-medium">{row.year}</td>
                  <td className="p-4 text-right font-semibold">
                    {(row.emi / 100).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm',
                        row.status === 'High EMI Phase' && 'bg-solar-orange/10 text-solar-orange',
                        row.status === 'Mid Loan' && 'bg-secondary/10 text-secondary',
                        row.status === 'Near Closure' && 'bg-solar-gold/10 text-solar-gold',
                        row.status === 'Final' && 'bg-primary/10 text-primary',
                        row.status === 'Active' && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {row.status === 'Final' ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : null}
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loan Closure Note */}
        <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Check className="w-8 h-8 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-primary">Loan Closure: Year {loanYears.toFixed(1)}</h4>
            <p className="text-muted-foreground text-sm">
              Post loan closure, full revenue flows to equity holders with minimal operational costs
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
