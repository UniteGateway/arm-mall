import { useMemo } from 'react';
import { FinancialInputs, CalculatedMetrics, PROJECT_SPECS } from '@/types/presentation';

export function useFinancialCalculator(inputs: FinancialInputs): CalculatedMetrics {
  return useMemo(() => {
    const { projectCost, tariffRate, equityPercent, interestRate, loanTenureMonths, oaChargesMode, oaChargesEstimate } = inputs;
    
    // Core calculations
    const equityAmount = (projectCost * equityPercent) / 100;
    const loanAmount = projectCost - equityAmount;
    
    // Simple interest calculation (as per proposal: flat rate)
    const loanTenureYears = loanTenureMonths / 12;
    const totalInterest = (loanAmount * interestRate * loanTenureYears) / 100;
    const totalRepayment = loanAmount + totalInterest;
    const monthlyEMI = totalRepayment / loanTenureMonths;
    const annualEMI = monthlyEMI * 12;
    
    // Generation & Revenue
    const annualGeneration = PROJECT_SPECS.capacity * PROJECT_SPECS.unitsPerMW;
    const grossRevenue = (annualGeneration * tariffRate) / 100000; // in lakhs
    
    // Net revenue calculation
    let oaCharges = 0;
    if (oaChargesMode === 'estimated') {
      oaCharges = (annualGeneration * oaChargesEstimate) / 100000; // in lakhs
    }
    const netRevenue = grossRevenue - oaCharges;
    
    // Post-loan cash flow (after loan closure)
    const amcCost = (annualGeneration * 0.40) / 100000; // ₹0.40/unit AMC
    const postLoanCashFlow = netRevenue - amcCost;
    
    // Breakeven calculation (simplified)
    const annualNetDuringLoan = netRevenue - annualEMI;
    const yearsOfLoan = loanTenureYears;
    const cumulativeDuringLoan = annualNetDuringLoan * yearsOfLoan;
    
    let breakEvenYear: number;
    if (cumulativeDuringLoan >= equityAmount) {
      breakEvenYear = Math.ceil(equityAmount / (annualNetDuringLoan > 0 ? netRevenue : 1));
    } else {
      const remainingToRecover = equityAmount - (netRevenue - annualEMI) * yearsOfLoan;
      const yearsAfterLoan = remainingToRecover > 0 ? remainingToRecover / postLoanCashFlow : 0;
      breakEvenYear = Math.ceil(yearsOfLoan + yearsAfterLoan);
    }
    breakEvenYear = Math.max(1, Math.min(breakEvenYear, 15)); // Reasonable bounds
    
    // IRR estimation (simplified range based on equity and cash flows)
    const totalCashFlows = (netRevenue - annualEMI) * yearsOfLoan + postLoanCashFlow * (25 - yearsOfLoan);
    const avgAnnualReturn = totalCashFlows / 25;
    const simpleROI = ((avgAnnualReturn / equityAmount) * 100);
    
    const equityIRR = {
      min: Math.max(15, Math.round(simpleROI * 0.8)),
      max: Math.min(30, Math.round(simpleROI * 1.1)),
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
    };
  }, [inputs]);
}
