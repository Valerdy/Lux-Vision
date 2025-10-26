import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export const LoadingSpinner = ({
  size = 'md',
  className,
  text,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const spinner = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Page Loading Component
export const PageLoading = ({ message = 'Chargement...' }: { message?: string }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <LoadingSpinner size="lg" text={message} />
  </div>
);

// Full Screen Loading Overlay
export const FullScreenLoading = ({ message = 'Chargement...' }: { message?: string }) => (
  <LoadingSpinner size="xl" text={message} fullScreen />
);

// Button Loading Spinner
export const ButtonLoading = () => (
  <Loader2 className="w-4 h-4 animate-spin" />
);

export default LoadingSpinner;
