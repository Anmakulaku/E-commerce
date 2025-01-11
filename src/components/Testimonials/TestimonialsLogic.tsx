import { useState, useEffect } from 'react';
import * as TestimonialsItems from '../../utilities/data/itemTestimonials';
import { TestimonialsItem } from './TestimonialsItem';

export function useTestimonialsLogic() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    checkScreenSize(); 
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(
      prevSlide => (prevSlide + 1) % TestimonialsItems.items.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      prevSlide =>
        (prevSlide - 1 + TestimonialsItems.items.length) %
        TestimonialsItems.items.length
    );
  };

  const renderTestimonialsItems = () => {
    if (isMobile) {
      // Tylko jedna karta na ekranie w trybie mobilnym
      const testimonial = TestimonialsItems.items[currentSlide];
      return (
        <TestimonialsItem
          key={testimonial.id}
          {...testimonial}
          isMain={true}
        />
      );
    }

    // Standardowy tryb (więcej kart na ekranie)
    const visibleSlides = [
      TestimonialsItems.items[
        (currentSlide - 1 + TestimonialsItems.items.length) %
          TestimonialsItems.items.length
      ],
      TestimonialsItems.items[currentSlide],
      TestimonialsItems.items[
        (currentSlide + 1) % TestimonialsItems.items.length
      ],
    ];

    return visibleSlides.map(testimonial => (
      <TestimonialsItem
        key={testimonial.id}
        {...testimonial}
        isMain={testimonial.id === currentSlide + 1}
      />
    ));
  };

  return {
    nextSlide,
    prevSlide,
    renderTestimonialsItems,
    isMobile,
  };
}
