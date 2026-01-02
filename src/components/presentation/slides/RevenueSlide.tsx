import { TrendingUp, IndianRupee, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps } from '@/types/presentation';

export function RevenueSlide({ inputs, metrics, isActive }: SlideProps) {
  const formatNumber = (num: number) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)} Lakh`;
    return num.toLocaleString('en-IN');
  };

  const oaCharges = inputs.oaChargesMode === 'estimated'
    ? (metrics.annualGeneration * inputs.oaChargesEstimate) / 100000
    : 0;

  const revenueData = [
    {
      name: 'Annual Revenue',
      gross: metrics.grossRevenue,
      net: metrics.netRevenue,
      oaCharges: oaCharges,
    },
  ];

  return (
    <SlideContainer isActive={isActive} variant="chart">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Revenue Estimation
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Annual revenue projections based on current assumptions
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Metrics */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Gross Revenue */}
            <div className="p-6 rounded-xl bg-card border">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Gross Revenue
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Units</span>
                  <span>{formatNumber(metrics.annualGeneration)} / year</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Tariff</span>
                  <span>₹{inputs.tariffRate.toFixed(2)} / unit</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-semibold">
                  <span>Gross Revenue</span>
                  <span className="text-primary">₹{(metrics.grossRevenue / 100).toFixed(2)} Cr / year</span>
                </div>
              </div>
            </div>

            {/* Net Revenue */}
            <div className="p-6 rounded-xl bg-card border">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-accent" />
                Net Revenue
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Revenue</span>
                  <span>₹{metrics.grossRevenue.toFixed(1)} Lakhs</span>
                </div>
                {inputs.oaChargesMode === 'estimated' && (
                  <div className="flex justify-between text-solar-orange">
                    <span>Less: OA Charges</span>
                    <span>- ₹{oaCharges.toFixed(1)} Lakhs</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t font-semibold">
                  <span>Net Revenue</span>
                  <span className="text-accent">₹{(metrics.netRevenue / 100).toFixed(2)} Cr / year</span>
                </div>
              </div>

              {inputs.oaChargesMode === 'regulatory' && (
                <p className="mt-3 text-xs text-muted-foreground italic">
                  * Net revenue derived after applicable OA & statutory charges per TSERC
                </p>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-card rounded-xl p-6 border animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold mb-4">Gross vs Net Revenue (₹ Lakhs)</h4>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string) => [
                      `₹${value.toFixed(1)} Lakhs`,
                      name === 'gross' ? 'Gross Revenue' : 'Net Revenue',
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="gross" fill="hsl(var(--chart-1))" name="Gross Revenue" radius={[0, 4, 4, 0]} barSize={40} />
                  <Bar dataKey="net" fill="hsl(var(--chart-2))" name="Net Revenue" radius={[0, 4, 4, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-sm text-muted-foreground text-center">
              Conservative assumptions adopted for financial sensitivity
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
