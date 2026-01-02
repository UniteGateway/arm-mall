import { ChevronLeft, ChevronRight, Menu, Smartphone, Tablet, Monitor, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type DeviceView = 'mobile' | 'tablet' | 'desktop';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  slideNames: string[];
  onNavigate: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  deviceView?: DeviceView;
  onDeviceViewChange?: (view: DeviceView) => void;
}

const deviceViews: { id: DeviceView; icon: typeof Smartphone; label: string; width: string }[] = [
  { id: 'mobile', icon: Smartphone, label: 'Mobile', width: '375px' },
  { id: 'tablet', icon: Tablet, label: 'iPad', width: '768px' },
  { id: 'desktop', icon: Monitor, label: 'Desktop', width: '100%' },
];

export function SlideNavigation({
  currentSlide,
  totalSlides,
  slideNames,
  onNavigate,
  onPrev,
  onNext,
  deviceView = 'desktop',
  onDeviceViewChange,
}: SlideNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="text-primary">Slides</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-1">
              {slideNames.map((name, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(index)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-lg text-sm transition-colors',
                    currentSlide === index
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="opacity-60 mr-2">{index + 1}.</span>
                  {name}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Center: Device View Toggle + Progress */}
        <div className="flex items-center gap-4">
          {/* Device View Icons */}
          <div className="hidden sm:flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            {deviceViews.map((view) => {
              const Icon = view.icon;
              const isActive = deviceView === view.id;
              return (
                <Tooltip key={view.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="icon"
                      className={cn(
                        'h-8 w-8 relative',
                        isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                      )}
                      onClick={() => onDeviceViewChange?.(view.id)}
                    >
                      <Icon className="h-4 w-4" />
                      {isActive && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full flex items-center justify-center">
                          <Check className="h-2 w-2 text-white" />
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{view.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* Progress Dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  currentSlide === index
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground hidden md:block">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        {/* Right: Navigation */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
