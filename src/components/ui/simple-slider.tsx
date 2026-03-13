import React, { useState, useEffect } from 'react';

export interface SimpleSlide {
  title: string;
  description: string;
  media: string;
}

export interface SimpleSliderProps {
  slides?: SimpleSlide[];
  className?: string;
  autoSlideSpeed?: number;
}

const DEFAULT_SLIDES: SimpleSlide[] = [
  { title: "CARE NOT CUSTODY", description: "Advocating for human rights in mental healthcare across Maharashtra", media: "/hero-bg.jpg" },
  { title: "YOUR RIGHT", description: "Good public mental healthcare is your fundamental right", media: "/bg1.jpg" },
  { title: "ACCESS FOR ALL", description: "Let's make sure you can access quality care across Maharashtra", media: "/bg2.jpg" },
];

export function SimpleSlider({
  slides = DEFAULT_SLIDES,
  className = '',
  autoSlideSpeed = 5000
}: SimpleSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoSlideSpeed);

    return () => clearInterval(timer);
  }, [slides.length, autoSlideSpeed]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Images */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.media}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[5]" />
    </div>
  );
}

export default SimpleSlider;
