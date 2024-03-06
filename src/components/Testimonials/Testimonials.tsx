import "./Testimonials.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useTestimonialsLogic } from "./TestimonialsLogic";

export function Testimonials() {
    const { nextSlide, prevSlide, renderTestimonialsItems } = useTestimonialsLogic();

    return (
        <div className="testimonials">
        <span className="testimonials__title">This Is What Our Customers Say</span>
        <p className="testimonials__text">
            Discover reviews from our customers about their experiences with our products and customer
            service. Find out what others have to say about our brand and see why it's worth trusting
            us.
        </p>
        <div className="testimonials__items">
            {renderTestimonialsItems()}
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
