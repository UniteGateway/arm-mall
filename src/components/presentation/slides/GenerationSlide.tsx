import { Sun, Zap, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';

export function GenerationSlide({ inputs, metrics, isActive }: SlideProps) {
  const formatNumber = (num: number) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)} Lakh`;
    return num.toLocaleString('en-IN');
  };

  const generationData = [
    { name: '1 MW', units: PROJECT_SPECS.unitsPerMW / 100000, fill: 'hsl(var(--chart-1))' },
    { name: '1.5 MW (Total)', units: metrics.annualGeneration / 100000, fill: 'hsl(var(--chart-2))' },
  ];

  return (
    <SlideContainer isActive={isActive} variant="chart">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">Solar Generation Assumptions</h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          High irradiation zone – Nalgonda District advantage
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Metrics */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MetricCard
              icon={<Sun className="w-5 h-5" />}
              label="Location Advantage"
              value="High Irradiation"
              subValue="Nalgonda Zone"
              variant="accent"
            />
            <MetricCard
              icon={<Zap className="w-5 h-5" />}
              label="Units per MW / Year"
              value={formatNumber(PROJECT_SPECS.unitsPerMW)}
              variant="primary"
            />
            <MetricCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Total Annual Generation"
              value={`${formatNumber(metrics.annualGeneration)} Units`}
              subValue={`${PROJECT_SPECS.capacity} MW capacity`}
              variant="secondary"
            />
          </div>

          {/* Chart */}
          <div className="bg-card rounded-xl p-6 border animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold mb-4">Generation by Capacity (Lakh Units/Year)</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={generationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickFormatter={(v) => `${v}`} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)} Lakh Units`, 'Annual Generation']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="units" radius={[0, 4, 4, 0]}>
                    {generationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
