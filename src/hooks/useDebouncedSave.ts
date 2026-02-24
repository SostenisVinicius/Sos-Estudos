import { useEffect, useRef } from 'react';

export const useDebouncedSave = (fn: () => void | Promise<void>, deps: unknown[], delay = 400) => {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = setTimeout(() => {
      void fn();
    }, delay);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
