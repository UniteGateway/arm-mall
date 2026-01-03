import { Target, Calendar, TrendingUp, IndianRupee, Clock, PiggyBank } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';

export function ROISlide({ inputs, metrics, isActive }: SlideProps) {
  const hasLoan = metrics.loanAmount > 0;

  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">ROI & Payback</h2>
        <p className="text-muted-foreground mb-8">Key investment return metrics</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard 
            icon={<IndianRupee className="w-5 h-5" />} 
            label="Total Investment" 
            value={`₹${(metrics.equityAmount / 100).toFixed(2)} Cr`} 
            subValue="100% Equity (No Loan)"
            variant="primary" 
          />
          <MetricCard 
            icon={<Target className="w-5 h-5" />} 
            label="Payback Period" 
            value={`Year ${metrics.breakEvenYear}`} 
            subValue="Investment recovery"
            variant="accent" 
          />
          <MetricCard 
            icon={<PiggyBank className="w-5 h-5" />} 
            label="Annual Savings" 
            value={`₹${metrics.annualSavings.toFixed(1)} Lakhs`}
            subValue={`₹${metrics.monthlySavings.toFixed(2)}L/month`}
            variant="secondary" 
          />
          <MetricCard 
            icon={<TrendingUp className="w-5 h-5" />} 
            label="Equity IRR" 
            value={`${metrics.equityIRR.min}–${metrics.equityIRR.max}%`} 
            subValue="Expected return"
            variant="default" 
          />
        </div>

        {/* 30-Year Summary */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Investment</p>
              <p className="text-2xl font-bold">₹{(metrics.equityAmount / 100).toFixed(1)}Cr</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">30-Year Savings</p>
              <p className="text-2xl font-bold text-primary">₹{(metrics.lifetimeSavings / 100).toFixed(1)}Cr</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Net Benefit</p>
              <p className="text-2xl font-bold text-secondary">
                {((metrics.lifetimeSavings / metrics.equityAmount) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-muted/50 border text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <p className="font-semibold">Asset Life: {PROJECT_SPECS.projectLifeYears}+ Years</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Predictable savings throughout the project life with no debt obligations
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}