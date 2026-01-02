import { CheckCircle, Leaf, Sun } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '@/types/presentation';

export function ConclusionSlide({ isActive }: SlideProps) {
  return (
    <SlideContainer isActive={isActive} variant="hero">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8">
          <Sun className="w-10 h-10 text-yellow-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Investment Ready</h2>
        <p className="text-xl text-white/80 max-w-2xl mb-8">
          A fully compliant, policy-aligned, long-term renewable energy asset, delivering predictable returns with complete lifecycle management by Unite Solar.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['Policy Compliant', 'Stable Returns', 'Green Investment'].map((tag) => (
            <span key={tag} className="px-5 py-2 rounded-full bg-white/10 text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />{tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-8 text-white/60">
          <p className="text-lg font-semibold text-white">Unite Solar</p>
          <p className="text-sm">Your Partner in Clean Energy</p>
        </div>
      </div>
    </SlideContainer>
  );
}
