import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate initial loading state
 * Useful for showing skeleton loaders on first render
 * @param duration - Loading duration in milliseconds (default: 800ms)
 */
export const useInitialLoading = (duration: number = 800) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
};

export default useInitialLoading;
