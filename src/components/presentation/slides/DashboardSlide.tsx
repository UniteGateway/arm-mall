import { TrendingUp, IndianRupee, Calendar, Zap, Sun, MapPin, Building2, Leaf, PiggyBank } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import solarField from '@/assets/solar-field.jpg';

export function DashboardSlide({ inputs, metrics, isActive }: SlideProps) {
  const hasLoan = metrics.loanAmount > 0;

  const fundingData = [
    { name: 'Equity', value: metrics.equityAmount, color: 'hsl(var(--primary))' },
    { name: 'Debt', value: metrics.loanAmount, color: 'hsl(var(--secondary))' },
  ].filter(d => d.value > 0);

  if (inputs.isCaptive) {
    return (
      <SlideContainer isActive={isActive}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6 animate-fade-in">
            Investment Dashboard
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Key Metrics */}
            <div className="lg:col-span-2 space-y-4">
              {/* Top Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-xs font-medium">Investment</span>
                  </div>
                  <p className="text-2xl font-bold">₹{inputs.projectCost}L</p>
                  <p className="text-xs text-muted-foreground">{inputs.equityPercent}% Equity</p>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-br from-solar-orange/10 to-solar-orange/5 border border-solar-orange/20">
                  <div className="flex items-center gap-2 text-solar-orange mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-medium">Capacity</span>
                  </div>
                  <p className="text-2xl font-bold">{PROJECT_SPECS.capacity} MW</p>
                  <p className="text-xs text-muted-foreground">DC Capacity</p>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-medium">Equity IRR</span>
                  </div>
                  <p className="text-2xl font-bold">{metrics.equityIRR.min}-{metrics.equityIRR.max}%</p>
                  <p className="text-xs text-muted-foreground">Expected Return</p>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-br from-solar-gold/10 to-solar-gold/5 border border-solar-gold/20">
                  <div className="flex items-center gap-2 text-solar-gold mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-medium">Payback</span>
                  </div>
                  <p className="text-2xl font-bold">Year {metrics.breakEvenYear}</p>
                  <p className="text-xs text-muted-foreground">Recovery Period</p>
                </div>
              </div>

              {/* Generation & Savings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-card border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-solar-orange" />
                    Annual Generation
                  </h4>
                  <p className="text-3xl font-bold text-primary">
                    {(metrics.annualGeneration / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-sm text-muted-foreground">Units per year</p>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Value @ Grid Tariff</span>
                      <span className="font-semibold">₹{metrics.grossRevenue.toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Solar Cost/Unit</span>
                      <span className="font-semibold text-primary">₹{metrics.solarCostPerUnit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <PiggyBank className="w-4 h-4 text-primary" />
                    Annual Savings
                  </h4>
                  <p className="text-3xl font-bold text-primary">
                    ₹{metrics.annualSavings.toFixed(1)}L
                  </p>
                  <p className="text-sm text-muted-foreground">Per year (after AMC)</p>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Savings</span>
                      <span className="font-semibold">₹{metrics.monthlySavings.toFixed(2)}L</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>30-Year Savings</span>
                      <span className="font-semibold text-primary">₹{(metrics.lifetimeSavings / 100).toFixed(1)}Cr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Current Tariff</p>
                  <p className="text-xl font-bold text-destructive">₹{inputs.currentGridTariff}/Unit</p>
                  <p className="text-xs text-muted-foreground">Grid Power</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Solar Effective Cost</p>
                  <p className="text-xl font-bold text-primary">₹{metrics.solarCostPerUnit.toFixed(2)}/Unit</p>
                  <p className="text-xs text-muted-foreground">Over 30 Years</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Depreciation Benefit</p>
                  <p className="text-xl font-bold text-secondary">₹{metrics.totalDepreciationBenefit.toFixed(1)}L</p>
                  <p className="text-xs text-muted-foreground">Tax Savings</p>
                </div>
              </div>
            </div>

            {/* Right Column - Summary & Image */}
            <div className="space-y-4">
              {/* Funding Summary */}
              <div className="p-5 rounded-xl bg-card border">
                <h4 className="font-semibold mb-4">Funding Model</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                    <span className="font-medium">Equity</span>
                    <span className="text-xl font-bold text-primary">₹{metrics.equityAmount.toFixed(0)}L</span>
                  </div>
                  {hasLoan && (
                    <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/5">
                      <span className="font-medium">Debt</span>
                      <span className="text-xl font-bold text-secondary">₹{metrics.loanAmount.toFixed(0)}L</span>
                    </div>
                  )}
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Land</span>
                      <span className="font-semibold text-primary">{inputs.isOwnLand ? "Own Land" : `₹${metrics.landCost}L`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Loan</span>
                      <span className="font-semibold text-primary">{hasLoan ? `${(inputs.loanTenureMonths/12).toFixed(1)} Yrs` : "Not Required"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Image */}
              <div className="rounded-xl overflow-hidden border">
                <img 
                  src={solarField} 
                  alt="Solar Power Plant" 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 bg-card">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="font-medium">{PROJECT_SPECS.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>Captive Power Plant</span>
                  </div>
                </div>
              </div>

              {/* Plant Life */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-solar-gold/10 to-solar-gold/5 border border-solar-gold/20 text-center">
                <Leaf className="w-6 h-6 text-solar-gold mx-auto mb-2" />
                <p className="text-2xl font-bold">{PROJECT_SPECS.projectLifeYears}+ Years</p>
                <p className="text-xs text-muted-foreground">Project Life</p>
              </div>
            </div>
          </div>
        </div>
      </SlideContainer>
    );
  }

  // Open Access Mode
  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-6 animate-fade-in">
          Investment Dashboard
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Key Metrics */}
          <div className="lg:col-span-2 space-y-4">
            {/* Top Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <IndianRupee className="w-4 h-4" />
                  <span className="text-xs font-medium">Project Cost</span>
                </div>
                <p className="text-2xl font-bold">₹{inputs.projectCost}L</p>
                <p className="text-xs text-muted-foreground">Total Investment</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-solar-orange/10 to-solar-orange/5 border border-solar-orange/20">
                <div className="flex items-center gap-2 text-solar-orange mb-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-medium">Capacity</span>
                </div>
                <p className="text-2xl font-bold">{PROJECT_SPECS.capacity} MW</p>
                <p className="text-xs text-muted-foreground">DC Capacity</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 text-secondary mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">Equity IRR</span>
                </div>
                <p className="text-2xl font-bold">{metrics.equityIRR.min}-{metrics.equityIRR.max}%</p>
                <p className="text-xs text-muted-foreground">Expected Return</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-solar-gold/10 to-solar-gold/5 border border-solar-gold/20">
                <div className="flex items-center gap-2 text-solar-gold mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">Breakeven</span>
                </div>
                <p className="text-2xl font-bold">Year {metrics.breakEvenYear}</p>
                <p className="text-xs text-muted-foreground">Recovery Period</p>
              </div>
            </div>

            {/* Revenue & Cash Flow */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-card border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-solar-orange" />
                  Annual Generation
                </h4>
                <p className="text-3xl font-bold text-primary">
                  {(metrics.annualGeneration / 1000000).toFixed(2)}M
                </p>
                <p className="text-sm text-muted-foreground">Units per year</p>
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Gross Revenue</span>
                    <span className="font-semibold">₹{metrics.grossRevenue.toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Net Revenue</span>
                    <span className="font-semibold text-primary">₹{metrics.netRevenue.toFixed(1)}L</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 rounded-xl bg-card border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Post-Loan Cash Flow
                </h4>
                <p className="text-3xl font-bold text-primary">
                  ₹{metrics.postLoanCashFlow.toFixed(1)}L
                </p>
                <p className="text-sm text-muted-foreground">Annual (Year {Math.ceil(inputs.loanTenureMonths/12)+1}+)</p>
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Monthly EMI</span>
                    <span className="font-semibold">₹{(metrics.monthlyEMI).toFixed(2)}L</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Loan Tenure</span>
                    <span className="font-semibold">{(inputs.loanTenureMonths/12).toFixed(1)} Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Land & Tax Benefits */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 border text-center">
                <p className="text-xs text-muted-foreground mb-1">Land Value (Year 30)</p>
                <p className="text-xl font-bold text-primary">₹{(metrics.landValueYear30 / 100).toFixed(1)}Cr</p>
                <p className="text-xs text-muted-foreground">From ₹{(metrics.landCost / 100).toFixed(1)}Cr</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border text-center">
                <p className="text-xs text-muted-foreground mb-1">Depreciation Benefit</p>
                <p className="text-xl font-bold text-secondary">₹{metrics.totalDepreciationBenefit.toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Tax Savings</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border text-center">
                <p className="text-xs text-muted-foreground mb-1">Plant Life</p>
                <p className="text-xl font-bold">{PROJECT_SPECS.projectLifeYears}+</p>
                <p className="text-xs text-muted-foreground">Years</p>
              </div>
            </div>
          </div>

          {/* Right Column - Funding & Image */}
          <div className="space-y-4">
            {/* Funding Split */}
            <div className="p-5 rounded-xl bg-card border">
              <h4 className="font-semibold mb-4">Funding Structure</h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fundingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      dataKey="value"
                      stroke="none"
                    >
                      {fundingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                {fundingData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}: ₹{item.value.toFixed(0)}L</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Image */}
            <div className="rounded-xl overflow-hidden border">
              <img 
                src={solarField} 
                alt="Solar Power Plant" 
                className="w-full h-40 object-cover"
              />
              <div className="p-4 bg-card">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="font-medium">{PROJECT_SPECS.client}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{PROJECT_SPECS.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}