import { CheckCircle, Sun, PiggyBank, Building2, Zap } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps, PROJECT_SPECS } from '@/types/presentation';

export function ConclusionSlide({ metrics, isActive }: SlideProps) {
  return (
    <SlideContainer isActive={isActive} variant="hero">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8 animate-scale-in">
          <Sun className="w-10 h-10 text-yellow-400" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white animate-fade-in">
          Captive Solar Power Plant
        </h2>
        <h3 className="text-xl md:text-2xl text-solar-orange mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {PROJECT_SPECS.client}
        </h3>
        
        <p className="text-xl text-white/80 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          100% ownership, own land, zero debt — a self-sustaining power solution delivering 
          <span className="text-solar-gold font-semibold"> ₹{(metrics.lifetimeSavings / 100).toFixed(1)} Cr savings</span> over {PROJECT_SPECS.projectLifeYears} years.
        </p>

        {/* Key Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
            <Building2 className="w-6 h-6 text-solar-orange mx-auto mb-2" />
            <p className="text-sm text-white/70">Own Land</p>
            <p className="font-semibold text-white">Zero Cost</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-solar-gold mx-auto mb-2" />
            <p className="text-sm text-white/70">Grid Tariff</p>
            <p className="font-semibold text-white">₹8/Unit</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
            <Sun className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-white/70">Solar Cost</p>
            <p className="font-semibold text-white">₹{metrics.solarCostPerUnit.toFixed(2)}/Unit</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
            <PiggyBank className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm text-white/70">Payback</p>
            <p className="font-semibold text-white">Year {metrics.breakEvenYear}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {['100% Equity', 'No Loan', 'Own Consumption', 'Green Power'].map((tag) => (
            <span key={tag} className="px-5 py-2 rounded-full bg-white/10 text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />{tag}
            </span>
          ))}
        </div>

        <div className="absolute bottom-8 text-white/60 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-lg font-semibold text-white">Unite Solar</p>
          <p className="text-sm">Your Partner in Clean Energy</p>
        </div>
      </div>
    </SlideContainer>
  );
}