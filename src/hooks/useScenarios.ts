import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FinancialInputs, Scenario } from '@/types/presentation';
import { useToast } from '@/hooks/use-toast';

export function useScenarios() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchScenarios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scenarios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScenarios(data || []);
    } catch (error: any) {
      console.error('Error fetching scenarios:', error);
      toast({
        title: 'Error',
        description: 'Failed to load scenarios',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveScenario = async (name: string, inputs: FinancialInputs) => {
    try {
      const { data, error } = await supabase
        .from('scenarios')
        .insert({
          name,
          project_cost: inputs.projectCost,
          tariff_rate: inputs.tariffRate,
          equity_percent: inputs.equityPercent,
          interest_rate: inputs.interestRate,
          loan_tenure_months: inputs.loanTenureMonths,
          oa_charges_mode: inputs.oaChargesMode,
          oa_charges_estimate: inputs.oaChargesEstimate,
        })
        .select()
        .single();

      if (error) throw error;

      setScenarios((prev) => [data, ...prev]);
      toast({
        title: 'Scenario Saved',
        description: `"${name}" has been saved successfully`,
      });
      return data;
    } catch (error: any) {
      console.error('Error saving scenario:', error);
      toast({
        title: 'Error',
        description: 'Failed to save scenario',
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteScenario = async (id: string) => {
    try {
      const { error } = await supabase.from('scenarios').delete().eq('id', id);

      if (error) throw error;

      setScenarios((prev) => prev.filter((s) => s.id !== id));
      toast({
        title: 'Scenario Deleted',
        description: 'Scenario has been removed',
      });
    } catch (error: any) {
      console.error('Error deleting scenario:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete scenario',
        variant: 'destructive',
      });
    }
  };

  const loadScenario = (scenario: Scenario): FinancialInputs => {
    return {
      projectCost: Number(scenario.project_cost),
      tariffRate: Number(scenario.tariff_rate),
      equityPercent: Number(scenario.equity_percent),
      interestRate: Number(scenario.interest_rate),
      loanTenureMonths: scenario.loan_tenure_months,
      oaChargesMode: scenario.oa_charges_mode as 'estimated' | 'regulatory',
      oaChargesEstimate: Number(scenario.oa_charges_estimate),
      // Default captive values for loaded scenarios
      currentGridTariff: 8,
      monthlyConsumption: 3,
      isCaptive: true,
      isOwnLand: true,
    };
  };

  useEffect(() => {
    fetchScenarios();
  }, []);

  return {
    scenarios,
    loading,
    saveScenario,
    deleteScenario,
    loadScenario,
    refetch: fetchScenarios,
  };
}
