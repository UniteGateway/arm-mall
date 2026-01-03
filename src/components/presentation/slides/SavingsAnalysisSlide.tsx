import { TrendingDown, PiggyBank, Zap, Calendar, IndianRupee } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

export function SavingsAnalysisSlide({ inputs, metrics, isActive }: SlideProps) {
  const comparisonData = [
    { 
      name: 'Grid Power', 
      cost: inputs.currentGridTariff, 
      color: 'hsl(var(--destructive))' 
    },
    { 
      name: 'Solar Power', 
      cost: metrics.solarCostPerUnit, 
      color: 'hsl(var(--primary))' 
    },
  ];

  const savingsPerUnit = inputs.currentGridTariff - metrics.solarCostPerUnit;
  const savingsPercent = ((savingsPerUnit / inputs.currentGridTariff) * 100).toFixed(0);

  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Savings Analysis
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Compare current grid costs vs. solar power generation
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Cost Comparison */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card border">
              <h3 className="font-semibold mb-4">Cost Per Unit Comparison</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" tickFormatter={(v) => `₹${v}`} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip 
                      formatter={(value: number) => [`₹${value.toFixed(2)}/Unit`, 'Cost']}
                      contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Bar dataKey="cost" radius={[0, 8, 8, 0]}>
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
              <TrendingDown className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-4xl font-bold text-primary">
                {savingsPercent}% Lower
              </p>
              <p className="text-muted-foreground mt-1">
                Solar cost vs Grid tariff
              </p>
              <p className="text-sm text-primary mt-2">
                Save ₹{savingsPerUnit.toFixed(2)} per unit
              </p>
            </div>
          </div>

          {/* Right - Savings Metrics */}
          <div className="space-y-4">
            <MetricCard
              icon={<IndianRupee className="w-5 h-5" />}
              label="Current Monthly Bill"
              value={`₹${inputs.monthlyConsumption.toFixed(0)} Lakhs`}
              subValue={`@ ₹${inputs.currentGridTariff}/unit from grid`}
              variant="default"
            />
            <MetricCard
              icon={<Zap className="w-5 h-5" />}
              label="Solar Generation Value"
              value={`₹${metrics.grossRevenue.toFixed(1)} Lakhs/Year`}
              subValue={`${(metrics.annualGeneration / 100000).toFixed(1)} Lakh units/year`}
              variant="primary"
            />
            <MetricCard
              icon={<PiggyBank className="w-5 h-5" />}
              label="Annual Savings"
              value={`₹${metrics.annualSavings.toFixed(1)} Lakhs`}
              subValue={`₹${metrics.monthlySavings.toFixed(2)} Lakhs/month`}
              variant="secondary"
            />
            <MetricCard
              icon={<Calendar className="w-5 h-5" />}
              label="30-Year Savings"
              value={`₹${(metrics.lifetimeSavings / 100).toFixed(1)} Crores`}
              subValue="Total savings over project life"
              variant="accent"
            />

            {/* Additional Info */}
            <div className="p-4 rounded-xl bg-muted/50 border">
              <h4 className="font-semibold mb-2">Key Assumptions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AMC Cost: ₹0.40/unit included</li>
                <li>• Project Life: {PROJECT_SPECS.projectLifeYears} years</li>
                <li>• Annual Generation: {(metrics.annualGeneration / 1000000).toFixed(2)}M units</li>
                <li>• Grid tariff escalation: Not considered (upside)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}