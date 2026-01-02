export interface FinancialInputs {
  projectCost: number; // in lakhs
  tariffRate: number; // per unit
  equityPercent: number;
  interestRate: number;
  loanTenureMonths: number;
  oaChargesMode: 'estimated' | 'regulatory';
  oaChargesEstimate: number; // per unit
}

export interface CalculatedMetrics {
  equityAmount: number;
  loanAmount: number;
  totalInterest: number;
  totalRepayment: number;
  monthlyEMI: number;
  annualGeneration: number;
  grossRevenue: number;
  netRevenue: number;
  annualEMI: number;
  postLoanCashFlow: number;
  breakEvenYear: number;
  equityIRR: { min: number; max: number };
}

export interface Scenario {
  id: string;
  name: string;
  project_cost: number;
  tariff_rate: number;
  equity_percent: number;
  interest_rate: number;
  loan_tenure_months: number;
  oa_charges_mode: string;
  oa_charges_estimate: number;
  created_at: string;
  updated_at: string;
}

export interface SlideProps {
  inputs: FinancialInputs;
  metrics: CalculatedMetrics;
  onInputChange?: (inputs: Partial<FinancialInputs>) => void;
  isActive: boolean;
}

export const DEFAULT_INPUTS: FinancialInputs = {
  projectCost: 600,
  tariffRate: 4.75,
  equityPercent: 25,
  interestRate: 10.25,
  loanTenureMonths: 78,
  oaChargesMode: 'regulatory',
  oaChargesEstimate: 0.85,
};

export const COST_BREAKDOWN = [
  { name: 'Solar Modules, Inverters, BOS', value: 470, color: 'hsl(var(--chart-1))' },
  { name: 'Engineering & Commissioning', value: 30, color: 'hsl(var(--chart-2))' },
  { name: 'Liaisoning & Approvals', value: 25, color: 'hsl(var(--chart-3))' },
  { name: 'Government Fees', value: 12, color: 'hsl(var(--chart-4))' },
  { name: 'Other (Bay, HT Line, etc.)', value: 63, color: 'hsl(var(--chart-5))' },
];

export const PROJECT_SPECS = {
  capacity: 1.5,
  capacityUnit: 'MW',
  landRequirement: '5-6 Acres',
  location: 'Nalgonda District, Telangana',
  model: 'Open Access / Third-Party PPA',
  projectLife: '25-30 Years',
  unitsPerMW: 1600000,
};
