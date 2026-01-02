import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SlideContainerProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
  variant?: 'default' | 'hero' | 'chart';
}

export function SlideContainer({ children, isActive, className, variant = 'default' }: SlideContainerProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col transition-all duration-500 ease-out',
        isActive ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 z-0 pointer-events-none',
        variant === 'hero' && 'bg-gradient-hero text-primary-foreground',
        variant === 'default' && 'bg-background',
        variant === 'chart' && 'bg-muted/30',
        className
      )}
    >
      <div className="flex-1 overflow-y-auto scrollbar-thin p-8 lg:p-12">
        {children}
      </div>
    </div>
  );
}
