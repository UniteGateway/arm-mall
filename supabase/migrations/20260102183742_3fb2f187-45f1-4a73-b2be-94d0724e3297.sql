-- Create table for saved financial scenarios
CREATE TABLE public.scenarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  project_cost DECIMAL(12,2) NOT NULL DEFAULT 600,
  tariff_rate DECIMAL(5,2) NOT NULL DEFAULT 4.75,
  equity_percent DECIMAL(5,2) NOT NULL DEFAULT 25,
  interest_rate DECIMAL(5,2) NOT NULL DEFAULT 10.25,
  loan_tenure_months INTEGER NOT NULL DEFAULT 78,
  oa_charges_mode TEXT NOT NULL DEFAULT 'regulatory',
  oa_charges_estimate DECIMAL(5,2) DEFAULT 0.85,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but allow public read/write for simplicity - no auth required)
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read scenarios
CREATE POLICY "Anyone can view scenarios" 
ON public.scenarios 
FOR SELECT 
USING (true);

-- Allow anyone to create scenarios
CREATE POLICY "Anyone can create scenarios" 
ON public.scenarios 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update scenarios
CREATE POLICY "Anyone can update scenarios" 
ON public.scenarios 
FOR UPDATE 
USING (true);

-- Allow anyone to delete scenarios
CREATE POLICY "Anyone can delete scenarios" 
ON public.scenarios 
FOR DELETE 
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_scenarios_updated_at
BEFORE UPDATE ON public.scenarios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();