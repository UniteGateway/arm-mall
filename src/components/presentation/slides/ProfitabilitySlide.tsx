import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Calendar, PiggyBank } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';

export function ProfitabilitySlide({ inputs, metrics, isActive }: SlideProps) {
  const cashFlowData = [];
  let cumulative = -metrics.equityAmount; // Start with negative equity investment
  
  for (let year = 1; year <= 30; year++) {
    // For captive: annual cash flow = savings (net revenue after AMC)
    const annualCashFlow = metrics.netRevenue;
    cumulative += annualCashFlow;
    cashFlowData.push({ 
      year: `Y${year}`, 
      yearNum: year,
      cashFlow: annualCashFlow, 
      cumulative: cumulative 
    });
  }

  return (
    <SlideContainer isActive={isActive} variant="chart">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">Profitability & Cash Flow</h2>
        <p className="text-muted-foreground mb-6">{PROJECT_SPECS.projectLifeYears}-year cash flow projection (Captive Model)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <MetricCard 
            icon={<Calendar className="w-5 h-5" />} 
            label="Initial Investment" 
            value={`₹${metrics.equityAmount.toFixed(0)} Lakhs`}
            subValue="Year 0"
            variant="default" 
          />
          <MetricCard 
            icon={<TrendingUp className="w-5 h-5" />} 
            label="Annual Cash Flow" 
            value={`₹${metrics.netRevenue.toFixed(0)} Lakhs/yr`} 
            subValue="After AMC costs" 
            variant="primary" 
          />
          <MetricCard 
            icon={<PiggyBank className="w-5 h-5" />} 
            label="30-Year Net Gain" 
            value={`₹${(metrics.lifetimeSavings / 100).toFixed(1)} Cr`} 
            subValue="Total profit" 
            variant="secondary" 
          />
        </div>
        
        <div className="bg-card rounded-xl p-6 border">
          <h4 className="font-semibold mb-4">Cumulative Cash Flow (₹ Lakhs)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(v) => `${(v/100).toFixed(0)}Cr`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))', 
                    borderRadius: '8px' 
                  }}
                  formatter={(value: number, name: string) => [
                    `₹${value.toFixed(0)} Lakhs`,
                    name === 'cumulative' ? 'Cumulative' : 'Annual'
                  ]}
                />
                <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Breakeven at Year {metrics.breakEvenYear} • No debt servicing required
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}