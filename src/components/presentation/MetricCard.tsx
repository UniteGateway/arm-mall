import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  subValue?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function MetricCard({ icon, label, value, subValue, variant = 'default', className }: MetricCardProps) {
  return (
    <div
      className={cn(
        'p-5 rounded-xl border transition-all hover:shadow-card',
        variant === 'default' && 'bg-card border-border',
        variant === 'primary' && 'bg-primary/5 border-primary/20',
        variant === 'secondary' && 'bg-secondary/10 border-secondary/20',
        variant === 'accent' && 'bg-accent/10 border-accent/20',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'p-2.5 rounded-lg',
            variant === 'default' && 'bg-muted text-muted-foreground',
            variant === 'primary' && 'bg-primary/10 text-primary',
            variant === 'secondary' && 'bg-secondary/20 text-secondary',
            variant === 'accent' && 'bg-accent/20 text-accent'
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-xl font-semibold truncate">{value}</p>
          {subValue && <p className="text-sm text-muted-foreground mt-0.5">{subValue}</p>}
        </div>
      </div>
    </div>
  );
}
