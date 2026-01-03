export interface FinancialInputs {
  projectCost: number; // in lakhs
  tariffRate: number; // per unit (for Open Access)
  equityPercent: number;
  interestRate: number;
  loanTenureMonths: number;
  oaChargesMode: 'estimated' | 'regulatory';
  oaChargesEstimate: number; // per unit
  // Captive specific
  currentGridTariff: number; // current electricity cost per unit
  monthlyConsumption: number; // monthly electricity bill in lakhs
  isCaptive: boolean; // captive or open access
  isOwnLand: boolean; // own land or purchased
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
  // Depreciation
  year1Depreciation: number;
  year2Depreciation: number;
  remainingDepreciation: number;
  totalDepreciationBenefit: number;
  // Land appreciation
  landCost: number;
  landValueYear10: number;
  landValueYear20: number;
  landValueYear30: number;
  // EMI Schedule
  emiSchedule: Array<{
    year: number;
    openingBalance: number;
    emi: number;
    principal: number;
    interest: number;
    closingBalance: number;
  }>;
  // Captive specific
  currentAnnualBill: number; // current annual electricity cost
  annualSavings: number; // savings from solar
  monthlySavings: number; // monthly savings
  lifetimeSavings: number; // 30 year savings
  solarCostPerUnit: number; // effective cost per unit from solar
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
  equityPercent: 100, // 100% equity - no loan
  interestRate: 10.25,
  loanTenureMonths: 0, // no loan
  oaChargesMode: 'regulatory',
  oaChargesEstimate: 0.85,
  // Captive defaults for ARM Mall
  currentGridTariff: 8, // ₹8/unit current tariff
  monthlyConsumption: 3, // ₹3 lakhs/month
  isCaptive: true, // captive power plant
  isOwnLand: true, // own land
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
  landRequirement: 'Own Land',
  location: 'ARM Mall, Hyderabad',
  model: 'Captive Power Plant',
  projectLife: '30+ Years',
  projectLifeYears: 30,
  unitsPerMW: 1600000,
  landCostPerAcre: 50, // in lakhs
  landAppreciationRate: 8, // % per annum
  client: 'ARM Mall, Hyderabad',
};
