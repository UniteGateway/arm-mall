import { Sun, Leaf, MapPin, Zap } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { PROJECT_SPECS } from '@/types/presentation';

interface CoverSlideProps {
  isActive: boolean;
}

export function CoverSlide({ isActive }: CoverSlideProps) {
  return (
    <SlideContainer isActive={isActive} variant="hero">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center animate-scale-in">
            <Sun className="w-12 h-12 text-yellow-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in text-white" style={{ animationDelay: '0.1s' }}>
          {PROJECT_SPECS.capacity} {PROJECT_SPECS.capacityUnit} Solar Power Project
        </h1>
        <h2 className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Financial & Technical Proposal
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {['Policy-Aligned', 'Stable Returns', 'Green Infrastructure'].map((tag) => (
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
            <span>{PROJECT_SPECS.model}</span>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-sm">Presented by</p>
          <p className="text-lg font-semibold text-white">Unite Solar</p>
        </div>
      </div>
    </SlideContainer>
  );
}
