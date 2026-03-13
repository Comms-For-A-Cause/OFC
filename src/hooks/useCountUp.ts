import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  suffix?: string;
  enabled?: boolean;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  suffix = "",
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCount(start);
      return;
    }

    startTimeRef.current = null;
    countRef.current = start;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration, enabled]);

  return `${count}${suffix}`;
}

export function useCountDown({
  start,
  end = 0,
  duration = 2000,
  suffix = "",
  enabled = true,
}: UseCountUpOptions & { start: number }) {
  return useCountUp({ start, end, duration, suffix, enabled });
}
