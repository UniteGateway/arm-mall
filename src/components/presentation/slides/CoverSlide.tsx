import { MapPin, Zap, Building2 } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { PROJECT_SPECS, FinancialInputs } from '@/types/presentation';
import uniteSolarLogo from '@/assets/unite-solar-logo.png';

interface CoverSlideProps {
  isActive: boolean;
  inputs?: FinancialInputs;
}

export function CoverSlide({ isActive, inputs }: CoverSlideProps) {
  const isCaptive = inputs?.isCaptive ?? true;
  
  const captiveTags = ['Captive Power', '100% Equity', 'Own Land', 'Zero Grid Dependency', '30+ Years Life'];
  const openAccessTags = ['Open Access', 'Third-Party PPA', 'Policy-Aligned', 'Stable Returns', '30+ Years Life'];
  
  const tags = isCaptive ? captiveTags : openAccessTags;
  const model = isCaptive ? 'Captive Power Plant' : 'Open Access / Third-Party PPA';

  return (
    <SlideContainer isActive={isActive} variant="hero">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] text-center">
        {/* Logo */}
        <div className="mb-8 animate-scale-in">
          <img 
            src={uniteSolarLogo} 
            alt="Unite Solar" 
            className="h-20 md:h-24 object-contain"
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in text-white" style={{ animationDelay: '0.1s' }}>
          {PROJECT_SPECS.capacity} {PROJECT_SPECS.capacityUnit} Solar Power Project
        </h1>
        <h2 className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Financial & Technical Proposal
        </h2>
        
        {/* Client Badge */}
        <div className="flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.25s' }}>
          <Building2 className="w-5 h-5 text-solar-orange" />
          <span className="text-lg font-semibold text-white">Client: {PROJECT_SPECS.client}</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {tags.map((tag) => (
            <span key={tag} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 text-white/70 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{PROJECT_SPECS.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span>{model}</span>
          </div>
        </div>
        
      </div>
    </SlideContainer>
  );
}