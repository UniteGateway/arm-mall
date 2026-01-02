import { IndianRupee, Percent, Calendar, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Area } from 'recharts';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps } from '@/types/presentation';

export function DebtStructureSlide({ inputs, metrics, isActive }: SlideProps) {
  const loanYears = inputs.loanTenureMonths / 12;
  
  // Generate EMI vs Outstanding loan data
  const emiData = [];
  let outstanding = metrics.loanAmount;
  const principalPerMonth = metrics.loanAmount / inputs.loanTenureMonths;
  
  for (let year = 1; year <= Math.ceil(loanYears); year++) {
    const monthsThisYear = year === Math.ceil(loanYears) 
      ? inputs.loanTenureMonths - (year - 1) * 12
      : 12;
    
    outstanding = Math.max(0, outstanding - principalPerMonth * monthsThisYear);
    
    emiData.push({
      year: `Year ${year}`,
      emi: metrics.annualEMI,
      outstanding: outstanding,
    });
  }

  return (
    <SlideContainer isActive={isActive} variant="chart">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">
          Debt Structure & EMI
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Loan repayment schedule and monthly obligations
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Metrics */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MetricCard
              icon={<IndianRupee className="w-5 h-5" />}
              label="Loan Amount"
              value={`₹${metrics.loanAmount.toFixed(0)} Lakhs`}
              variant="primary"
            />
            <MetricCard
              icon={<Percent className="w-5 h-5" />}
              label="Interest Rate"
              value={`${inputs.interestRate}% Flat`}
              variant="default"
            />
            <MetricCard
              icon={<Calendar className="w-5 h-5" />}
              label="Tenure"
              value={`${loanYears.toFixed(1)} Years`}
              subValue={`${inputs.loanTenureMonths} Months`}
              variant="default"
            />
            
            {/* EMI Calculation Box */}
            <div className="p-5 rounded-xl bg-card border">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">EMI Calculation</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="font-medium">≈ ₹{(metrics.totalInterest / 100).toFixed(2)} Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Repayment</span>
                  <span className="font-medium">≈ ₹{(metrics.totalRepayment / 100).toFixed(2)} Cr</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Monthly EMI</span>
                  <span className="font-bold text-primary">≈ ₹{metrics.monthlyEMI.toFixed(1)} Lakhs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-card rounded-xl p-6 border animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold mb-4">EMI vs Outstanding Loan (₹ Lakhs)</h4>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={emiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string) => [
                      `₹${value.toFixed(1)} Lakhs`,
                      name === 'emi' ? 'Annual EMI' : 'Outstanding',
                    ]}
                  />
                  <Bar dataKey="emi" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Line
                    type="monotone"
                    dataKey="outstanding"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-2))' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
