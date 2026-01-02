import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  slideNames: string[];
  onNavigate: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  slideNames,
  onNavigate,
  onPrev,
  onNext,
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

        {/* Center: Progress */}
        <div className="flex items-center gap-4">
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
          <span className="text-sm text-muted-foreground hidden sm:block">
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
