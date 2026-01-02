import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Target, Percent } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps } from '@/types/presentation';

export function ProfitabilitySlide({ inputs, metrics, isActive }: SlideProps) {
  const loanYears = inputs.loanTenureMonths / 12;
  const cashFlowData = [];
  let cumulative = -metrics.equityAmount;
  
  for (let year = 1; year <= 25; year++) {
    const annualCashFlow = year <= loanYears 
      ? metrics.netRevenue - metrics.annualEMI 
      : metrics.postLoanCashFlow;
    cumulative += annualCashFlow;
    cashFlowData.push({ year: `Y${year}`, cashFlow: annualCashFlow, cumulative });
  }

  return (
    <SlideContainer isActive={isActive} variant="chart">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">Profitability & Cash Flow</h2>
        <p className="text-muted-foreground mb-8">25-year cash flow projection</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <MetricCard icon={<Calendar className="w-5 h-5" />} label="During Loan Period" value="EMI + Depreciation" subValue="Minimal tax outflow" variant="default" />
          <MetricCard icon={<TrendingUp className="w-5 h-5" />} label="Post Loan Closure" value={`₹${metrics.postLoanCashFlow.toFixed(0)} Lakhs/yr`} subValue="Net annual cash inflow" variant="primary" />
        </div>
        <div className="bg-card rounded-xl p-6 border">
          <h4 className="font-semibold mb-4">Cumulative Cash Flow (₹ Lakhs)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="cumulative" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
