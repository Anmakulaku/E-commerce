import { useState } from "react";
import "./Testimonials.css";
import { TestimonialsItem } from "../components/TestimonialsItem";
import TestimonialsItems from "../data/itemTestimonials.json";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export function Testimonials() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % TestimonialsItems.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + TestimonialsItems.length) % TestimonialsItems.length
        );
    };

    return (
        <div className="testimonials">
        <span className="testimonials__title">This Is What Our Customers Say</span>
        <p className="testimonials__text">
            Discover reviews from our customers about their experiences with our products and customer
            service. Find out what others have to say about our brand and see why it's worth trusting
            us.
        </p>
        <div className="testimonials__items">
            {[currentSlide - 1, currentSlide, currentSlide + 1].map((index) => (
                <TestimonialsItem
                    key={index}
                    {...TestimonialsItems[(index + TestimonialsItems.length) % TestimonialsItems.length]}
                    isMain={index === currentSlide}
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
