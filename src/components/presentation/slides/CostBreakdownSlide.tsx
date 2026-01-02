import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SlideContainer } from '../SlideContainer';
import { SlideProps, COST_BREAKDOWN } from '@/types/presentation';

export function CostBreakdownSlide({ inputs, isActive }: SlideProps) {
  // Adjust values proportionally if project cost changed from default
  const scaleFactor = inputs.projectCost / 600;
  const adjustedData = COST_BREAKDOWN.map((item) => ({
    ...item,
    value: Math.round(item.value * scaleFactor),
  }));

  const total = adjustedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <SlideContainer isActive={isActive} variant="chart">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Detailed Project Cost Breakup
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Total Project Cost: ₹{inputs.projectCost.toFixed(0)} Lakhs
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart */}
          <div className="bg-card rounded-xl p-6 border animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={adjustedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {adjustedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`₹${value} Lakhs`, '']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {adjustedData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-card border hover:shadow-soft transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">₹{item.value} Lakhs</span>
                  <span className="text-muted-foreground text-sm ml-2">
                    ({((item.value / total) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            ))}

            {/* Included Items */}
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border-dashed border">
              <h5 className="font-medium text-sm text-muted-foreground mb-2">Included in "Other"</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Bay Extension at Substation</li>
                <li>• HT Line up to 3 km</li>
                <li>• Control Room & SCADA</li>
                <li>• CCTV, Security & Monitoring</li>
                <li>• Fencing & Solar Street Lights</li>
                <li>• Insurance (Project Period)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
