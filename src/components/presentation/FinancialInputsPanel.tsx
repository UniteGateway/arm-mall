import { useState } from 'react';
import { Settings, Save, Trash2, Building2, Zap, MapPin, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { FinancialInputs, Scenario, DEFAULT_INPUTS } from '@/types/presentation';
import { cn } from '@/lib/utils';

interface FinancialInputsPanelProps {
  inputs: FinancialInputs;
  onInputChange: (inputs: Partial<FinancialInputs>) => void;
  onReset: () => void;
  scenarios: Scenario[];
  onSaveScenario: (name: string) => void;
  onLoadScenario: (scenario: Scenario) => void;
  onDeleteScenario: (id: string) => void;
}

export function FinancialInputsPanel({
  inputs,
  onInputChange,
  onReset,
  scenarios,
  onSaveScenario,
  onLoadScenario,
  onDeleteScenario,
}: FinancialInputsPanelProps) {
  const [scenarioName, setScenarioName] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleSave = () => {
    if (scenarioName.trim()) {
      onSaveScenario(scenarioName.trim());
      setScenarioName('');
      setSaveDialogOpen(false);
    }
  };

  const handleModeChange = (isCaptive: boolean) => {
    if (isCaptive) {
      // Switch to Captive mode defaults
      onInputChange({
        isCaptive: true,
        equityPercent: 100,
        loanTenureMonths: 0,
        isOwnLand: true,
      });
    } else {
      // Switch to Open Access mode defaults
      onInputChange({
        isCaptive: false,
        equityPercent: 26,
        loanTenureMonths: 78,
        isOwnLand: false,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed top-4 right-4 z-50 bg-card/95 backdrop-blur-sm shadow-card"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-primary flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Financial Calculator
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Model Selection Toggle */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Power Model
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleModeChange(true)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                  inputs.isCaptive 
                    ? "border-primary bg-primary/10 text-primary" 
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <Building2 className="w-6 h-6" />
                <span className="text-sm font-medium">Captive</span>
                <span className="text-xs text-muted-foreground">Own Consumption</span>
              </button>
              <button
                onClick={() => handleModeChange(false)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                  !inputs.isCaptive 
                    ? "border-primary bg-primary/10 text-primary" 
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <Zap className="w-6 h-6" />
                <span className="text-sm font-medium">Open Access</span>
                <span className="text-xs text-muted-foreground">Third-Party PPA</span>
              </button>
            </div>
          </div>

          {/* Core Inputs */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Project Parameters
            </h4>

            <div className="space-y-2">
              <Label htmlFor="projectCost">Project Cost (₹ Lakhs)</Label>
              <Input
                id="projectCost"
                type="number"
                value={inputs.projectCost}
                onChange={(e) => onInputChange({ projectCost: Number(e.target.value) })}
                min={100}
                max={2000}
              />
            </div>

            {/* Captive-specific: Current Grid Tariff */}
            {inputs.isCaptive && (
              <>
                <div className="space-y-2">
                  <Label>Current Grid Tariff: ₹{inputs.currentGridTariff.toFixed(2)}/unit</Label>
                  <Slider
                    value={[inputs.currentGridTariff]}
                    onValueChange={([v]) => onInputChange({ currentGridTariff: v })}
                    min={5}
                    max={12}
                    step={0.25}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyBill">Monthly Electricity Bill (₹ Lakhs)</Label>
                  <Input
                    id="monthlyBill"
                    type="number"
                    value={inputs.monthlyConsumption}
                    onChange={(e) => onInputChange({ monthlyConsumption: Number(e.target.value) })}
                    min={0.5}
                    max={50}
                    step={0.5}
                  />
                </div>
              </>
            )}

            {/* Open Access: PPA Tariff */}
            {!inputs.isCaptive && (
              <div className="space-y-2">
                <Label>PPA Tariff Rate: ₹{inputs.tariffRate.toFixed(2)}/unit</Label>
                <Slider
                  value={[inputs.tariffRate]}
                  onValueChange={([v]) => onInputChange({ tariffRate: v })}
                  min={3.5}
                  max={6.5}
                  step={0.05}
                />
              </div>
            )}
          </div>

          {/* Funding Structure */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Funding Structure
            </h4>

            {/* Land Ownership Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="ownLand">Own Land</Label>
              </div>
              <Switch
                id="ownLand"
                checked={inputs.isOwnLand}
                onCheckedChange={(checked) => onInputChange({ isOwnLand: checked })}
              />
            </div>

            {/* Equity Slider - different ranges for captive vs open access */}
            <div className="space-y-2">
              <Label>Equity: {inputs.equityPercent}%</Label>
              <Slider
                value={[inputs.equityPercent]}
                onValueChange={([v]) => onInputChange({ equityPercent: v })}
                min={inputs.isCaptive ? 50 : 15}
                max={100}
                step={1}
              />
              {inputs.equityPercent === 100 && (
                <p className="text-xs text-muted-foreground">No loan required</p>
              )}
            </div>
          </div>

          {/* Loan Parameters - only show if not 100% equity */}
          {inputs.equityPercent < 100 && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Loan Structure
              </h4>

              <div className="space-y-2">
                <Label>Interest Rate: {inputs.interestRate}%</Label>
                <Slider
                  value={[inputs.interestRate]}
                  onValueChange={([v]) => onInputChange({ interestRate: v })}
                  min={8}
                  max={14}
                  step={0.25}
                />
              </div>

              <div className="space-y-2">
                <Label>Loan Tenure: {(inputs.loanTenureMonths / 12).toFixed(1)} Years</Label>
                <Slider
                  value={[inputs.loanTenureMonths]}
                  onValueChange={([v]) => onInputChange({ loanTenureMonths: v })}
                  min={48}
                  max={120}
                  step={6}
                />
              </div>
            </div>
          )}

          {/* Open Access Charges - only for Open Access mode */}
          {!inputs.isCaptive && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Open Access Charges
              </h4>

              <div className="flex items-center justify-between">
                <Label htmlFor="oaMode">Use Estimated Charges</Label>
                <Switch
                  id="oaMode"
                  checked={inputs.oaChargesMode === 'estimated'}
                  onCheckedChange={(checked) =>
                    onInputChange({ oaChargesMode: checked ? 'estimated' : 'regulatory' })
                  }
                />
              </div>

              {inputs.oaChargesMode === 'estimated' && (
                <div className="space-y-2">
                  <Label>OA Charges: ₹{inputs.oaChargesEstimate.toFixed(2)}/unit</Label>
                  <Slider
                    value={[inputs.oaChargesEstimate]}
                    onValueChange={([v]) => onInputChange({ oaChargesEstimate: v })}
                    min={0.3}
                    max={1.5}
                    step={0.05}
                  />
                </div>
              )}

              {inputs.oaChargesMode === 'regulatory' && (
                <p className="text-sm text-muted-foreground italic">
                  Charges as per TSERC & DISCOM tariff orders
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex gap-2">
              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Scenario
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Scenario</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="scenarioName">Scenario Name</Label>
                    <Input
                      id="scenarioName"
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                      placeholder="e.g., Conservative Estimate"
                      className="mt-2"
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!scenarioName.trim()}>
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={onReset}>
                Reset
              </Button>
            </div>

            {/* Saved Scenarios */}
            {scenarios.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Saved Scenarios</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <button
                        onClick={() => onLoadScenario(scenario)}
                        className="flex-1 text-left text-sm font-medium truncate"
                      >
                        {scenario.name}
                      </button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => onDeleteScenario(scenario.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}