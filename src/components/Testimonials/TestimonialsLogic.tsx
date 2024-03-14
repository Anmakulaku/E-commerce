import { useState } from "react";
import * as TestimonialsItems from "../../_mocks_/itemTestimonials";
import { TestimonialsItem } from "./TestimonialsItem";

export function useTestimonialsLogic() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % TestimonialsItems.items.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + TestimonialsItems.items.length) % TestimonialsItems.items.length
        );
    };

    const visibleSlides = [
        TestimonialsItems.items[(currentSlide - 1 + TestimonialsItems.items.length) % TestimonialsItems.items.length],
        TestimonialsItems.items[currentSlide],
        TestimonialsItems.items[(currentSlide + 1) % TestimonialsItems.items.length],
    ];

    const renderTestimonialsItems = () => {
        return visibleSlides.map((testimonial) => (
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
        renderTestimonialsItems
    };
}
