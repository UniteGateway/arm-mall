import { IndianRupee, Map, Percent, Calendar, Zap, Building2, Wallet, FileText } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { MetricCard } from '../MetricCard';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';

export function ProjectSnapshotSlide({ inputs, metrics, isActive }: SlideProps) {
  const formatCurrencyLakhs = (value: number) => `₹${value.toFixed(0)} Lakhs`;

  if (inputs.isCaptive) {
    return (
      <SlideContainer isActive={isActive}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">Project Snapshot</h2>
          <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Captive Power Plant for own consumption - Key parameters
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              icon={<IndianRupee className="w-5 h-5" />}
              label="Total Project Cost"
              value={formatCurrencyLakhs(inputs.projectCost)}
              variant="primary"
            />
            <MetricCard
              icon={<Map className="w-5 h-5" />}
              label="Land"
              value={inputs.isOwnLand ? "Own Land" : "5-6 Acres"}
              subValue={inputs.isOwnLand ? "No additional cost" : undefined}
              variant="default"
            />
            <MetricCard
              icon={<Percent className="w-5 h-5" />}
              label="Funding Model"
              value={inputs.equityPercent === 100 ? "100% Equity" : `${inputs.equityPercent}% Equity`}
              subValue={inputs.equityPercent === 100 ? "No loan required" : `${100 - inputs.equityPercent}% Debt`}
              variant="secondary"
            />
            <MetricCard
              icon={<Zap className="w-5 h-5" />}
              label="Current Grid Tariff"
              value={`₹${inputs.currentGridTariff.toFixed(2)} / Unit`}
              subValue="Presently paying"
              variant="accent"
            />
            <MetricCard
              icon={<Wallet className="w-5 h-5" />}
              label="Monthly Electricity Bill"
              value={`₹${inputs.monthlyConsumption.toFixed(0)} Lakhs`}
              subValue="Current consumption"
              variant="default"
            />
            <MetricCard
              icon={<Calendar className="w-5 h-5" />}
              label="Project Life"
              value={PROJECT_SPECS.projectLife}
              subValue="Operational period"
              variant="default"
            />
          </div>

          {/* Captive Highlight */}
          <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-primary mb-1">Captive Power Model</h4>
                <p className="text-muted-foreground">
                  Self-consumption model with 100% ownership. Generated power used directly at {PROJECT_SPECS.client}, 
                  eliminating dependency on grid power and providing long-term cost stability.
                </p>
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
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">Project Snapshot</h2>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Key financial and operational parameters at a glance
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            icon={<IndianRupee className="w-5 h-5" />}
            label="Total Project Cost"
            value={formatCurrencyLakhs(inputs.projectCost)}
            variant="primary"
          />
          <MetricCard
            icon={<Map className="w-5 h-5" />}
            label="Land Requirement"
            value={inputs.isOwnLand ? "Own Land" : "5-6 Acres"}
            variant="default"
          />
          <MetricCard
            icon={<Percent className="w-5 h-5" />}
            label="Equity Investment"
            value={formatCurrencyLakhs(metrics.equityAmount)}
            subValue={`${inputs.equityPercent}% of project cost`}
            variant="secondary"
          />
          <MetricCard
            icon={<IndianRupee className="w-5 h-5" />}
            label="Debt Funding"
            value={formatCurrencyLakhs(metrics.loanAmount)}
            subValue={`${100 - inputs.equityPercent}% of project cost`}
            variant="default"
          />
          <MetricCard
            icon={<Zap className="w-5 h-5" />}
            label="PPA Tariff (Market)"
            value={`₹${inputs.tariffRate.toFixed(2)} / Unit`}
            variant="accent"
          />
          <MetricCard
            icon={<Calendar className="w-5 h-5" />}
            label="Financing Tenure"
            value={`${(inputs.loanTenureMonths / 12).toFixed(1)} Years`}
            variant="default"
          />
        </div>

        {/* Policy Highlight */}
        <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start gap-4">
            <FileText className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-primary mb-1">Policy Requirement</h4>
              <p className="text-muted-foreground">
                26% Equity by Power Buyer as per Telangana Open Access regulations
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}