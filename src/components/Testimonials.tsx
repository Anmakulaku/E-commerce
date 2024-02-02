import { useState } from "react";
import "./Testimonials.css";
import { TestimonialsItem } from "../components/TestimonialsItem";
import * as TestimonialsItems from "../data/itemTestimonials";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export function Testimonials() {
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

    return (
        <div className="testimonials">
        <span className="testimonials__title">This Is What Our Customers Say</span>
        <p className="testimonials__text">
            Discover reviews from our customers about their experiences with our products and customer
            service. Find out what others have to say about our brand and see why it's worth trusting
            us.
        </p>
        <div className="testimonials__items">
            {visibleSlides.map((testimonial) => (
                <TestimonialsItem
                    key={testimonial.id}
                    {...testimonial}
                    isMain={testimonial.id === currentSlide + 1}
                />
            ))}
        </div>
        <div className="testimonials__arrowBox">
            <div className="testimonials__arrow testimonials__prevArrow" onClick={prevSlide}>
            <MdKeyboardArrowLeft />
            </div>
            <div className="testimonials__arrow testimonials__nextArrow" onClick={nextSlide}>
            <MdKeyboardArrowRight />
            </div>
        </div>
        </div>
    );
}
