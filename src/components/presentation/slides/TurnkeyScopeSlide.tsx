import { CheckCircle, Shield, Wrench } from 'lucide-react';
import { SlideContainer } from '../SlideContainer';
import { SlideProps } from '@/types/presentation';

export function TurnkeyScopeSlide({ isActive }: SlideProps) {
  const included = ['EPC (End-to-End)', 'O&M – 5 Years', 'Insurance', 'Cleaning & Monitoring', 'AMC', 'Security & Surveillance'];
  const warranty = [{ item: 'Modules', years: '12 Years Manufacturing' }, { item: 'Inverters', years: '10 Years' }];

  return (
    <SlideContainer isActive={isActive}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 animate-fade-in">Unite Solar Turnkey Scope</h2>
        <p className="text-muted-foreground mb-8">Complete project delivery and lifecycle management</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Wrench className="w-5 h-5 text-primary" />Included Services</h3>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-secondary" />Warranty Coverage</h3>
            {warranty.map((w) => (
              <div key={w.item} className="p-4 rounded-lg bg-muted/50 mb-3">
                <p className="font-medium">{w.item}</p>
                <p className="text-sm text-muted-foreground">{w.years}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
