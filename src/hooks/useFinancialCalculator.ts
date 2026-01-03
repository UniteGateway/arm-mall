import { useMemo } from 'react';
import { FinancialInputs, CalculatedMetrics, PROJECT_SPECS } from '@/types/presentation';

export function useFinancialCalculator(inputs: FinancialInputs): CalculatedMetrics {
  return useMemo(() => {
    const { projectCost, equityPercent, interestRate, loanTenureMonths, currentGridTariff, monthlyConsumption, isOwnLand } = inputs;
    
    // Core calculations
    const equityAmount = (projectCost * equityPercent) / 100;
    const loanAmount = projectCost - equityAmount;
    
    // EMI calculation - only if there's a loan
    let monthlyEMI = 0;
    let totalRepayment = 0;
    let totalInterest = 0;
    let annualEMI = 0;
    const emiSchedule: CalculatedMetrics['emiSchedule'] = [];
    
    if (loanAmount > 0 && loanTenureMonths > 0) {
      const monthlyRate = interestRate / 12 / 100;
      const totalMonths = loanTenureMonths;
      monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      // Generate EMI Schedule (yearly)
      let balance = loanAmount;
      const loanTenureYears = Math.ceil(loanTenureMonths / 12);
      
      for (let year = 1; year <= loanTenureYears; year++) {
        const monthsInYear = year === loanTenureYears && loanTenureMonths % 12 !== 0 
          ? loanTenureMonths % 12 
          : 12;
        
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        const openingBalance = balance;
        
        for (let month = 0; month < monthsInYear && balance > 0; month++) {
          const interestPayment = balance * monthlyRate;
          const principalPayment = Math.min(monthlyEMI - interestPayment, balance);
          yearlyInterest += interestPayment;
          yearlyPrincipal += principalPayment;
          balance -= principalPayment;
        }
        
        emiSchedule.push({
          year,
          openingBalance,
          emi: monthlyEMI * monthsInYear,
          principal: yearlyPrincipal,
          interest: yearlyInterest,
          closingBalance: Math.max(0, balance),
        });
      }
      
      totalRepayment = emiSchedule.reduce((sum, row) => sum + row.emi, 0);
      totalInterest = emiSchedule.reduce((sum, row) => sum + row.interest, 0);
      annualEMI = monthlyEMI * 12;
    }
    
    // Generation & Revenue
    const annualGeneration = PROJECT_SPECS.capacity * PROJECT_SPECS.unitsPerMW;
    
    // Captive calculations - savings based on current tariff
    const currentAnnualBill = monthlyConsumption * 12; // in lakhs
    const annualUnitsConsumed = (currentAnnualBill * 100000) / currentGridTariff; // units per year
    
    // AMC cost (₹0.40/unit)
    const amcCostPerUnit = 0.40;
    const annualAMCCost = (annualGeneration * amcCostPerUnit) / 100000; // in lakhs
    
    // Effective solar cost per unit over 30 years
    const totalProjectCost = projectCost; // already includes everything
    const totalAMCOver30Years = annualAMCCost * 30;
    const totalGenerationOver30Years = annualGeneration * 30;
    const solarCostPerUnit = ((totalProjectCost + totalAMCOver30Years) * 100000) / totalGenerationOver30Years;
    
    // Annual savings = what we would pay at grid tariff - AMC cost
    const grossRevenue = (annualGeneration * currentGridTariff) / 100000; // value of generation in lakhs
    const annualSavings = grossRevenue - annualAMCCost - annualEMI;
    const monthlySavings = annualSavings / 12;
    const lifetimeSavings = (grossRevenue - annualAMCCost) * PROJECT_SPECS.projectLifeYears - totalInterest;
    
    const netRevenue = grossRevenue - annualAMCCost;
    
    // Post-loan cash flow (after loan closure or if no loan)
    const postLoanCashFlow = netRevenue;
    
    // Depreciation calculations (40% accelerated depreciation for solar)
    const depreciableAmount = projectCost;
    const year1Depreciation = depreciableAmount * 0.40;
    const remainingAfterYear1 = depreciableAmount - year1Depreciation;
    const year2Depreciation = remainingAfterYear1 * 0.40;
    const remainingDepreciation = remainingAfterYear1 - year2Depreciation;
    const taxRate = 0.30;
    const totalDepreciationBenefit = (year1Depreciation + year2Depreciation) * taxRate;
    
    // Land appreciation calculations - only if not own land
    const landAcres = 5.5;
    const landCost = isOwnLand ? 0 : landAcres * PROJECT_SPECS.landCostPerAcre;
    const appreciationRate = PROJECT_SPECS.landAppreciationRate / 100;
    const baseLandValue = landAcres * PROJECT_SPECS.landCostPerAcre; // For appreciation calculation
    const landValueYear10 = baseLandValue * Math.pow(1 + appreciationRate, 10);
    const landValueYear20 = baseLandValue * Math.pow(1 + appreciationRate, 20);
    const landValueYear30 = baseLandValue * Math.pow(1 + appreciationRate, 30);
    
    // Breakeven calculation
    const loanYears = loanTenureMonths / 12;
    let breakEvenYear: number;
    
    if (loanAmount === 0) {
      // No loan - simple payback
      breakEvenYear = Math.ceil(equityAmount / netRevenue);
    } else {
      const annualNetDuringLoan = netRevenue - annualEMI;
      if (annualNetDuringLoan >= equityAmount / loanYears) {
        breakEvenYear = Math.ceil(equityAmount / netRevenue);
      } else {
        const cumulativeDuringLoan = annualNetDuringLoan * loanYears;
        const remainingToRecover = equityAmount - cumulativeDuringLoan;
        const yearsAfterLoan = remainingToRecover > 0 ? remainingToRecover / postLoanCashFlow : 0;
        breakEvenYear = Math.ceil(loanYears + yearsAfterLoan);
      }
    }
    breakEvenYear = Math.max(1, Math.min(breakEvenYear, 15));
    
    // IRR estimation with depreciation benefit considered
    const effectiveEquity = equityAmount - totalDepreciationBenefit;
    const totalCashFlows = loanAmount > 0 
      ? (netRevenue - annualEMI) * loanYears + postLoanCashFlow * (PROJECT_SPECS.projectLifeYears - loanYears)
      : postLoanCashFlow * PROJECT_SPECS.projectLifeYears;
    const avgAnnualReturn = totalCashFlows / PROJECT_SPECS.projectLifeYears;
    const simpleROI = ((avgAnnualReturn / effectiveEquity) * 100);
    
    const equityIRR = {
      min: Math.max(15, Math.round(simpleROI * 0.8)),
      max: Math.min(45, Math.round(simpleROI * 1.1)),
    };
    
    return {
      equityAmount,
      loanAmount,
      totalInterest,
      totalRepayment,
      monthlyEMI,
      annualGeneration,
      grossRevenue,
      netRevenue,
      annualEMI,
      postLoanCashFlow,
      breakEvenYear,
      equityIRR,
      year1Depreciation,
      year2Depreciation,
      remainingDepreciation,
      totalDepreciationBenefit,
      landCost,
      landValueYear10,
      landValueYear20,
      landValueYear30,
      emiSchedule,
      // Captive specific
      currentAnnualBill,
      annualSavings,
      monthlySavings,
      lifetimeSavings,
      solarCostPerUnit,
    };
  }, [inputs]);
}
