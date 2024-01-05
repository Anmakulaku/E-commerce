import "./Testimonials.css"
import { TestimonialsItem } from "../components/TestimonialsItem"
import TestimonialsItems from "../data/itemTestimonials.json"

export function Testimonials() {
    return (
        <div className="testimonials">
            <span className="testimonials__title">This Is What Our Customers Say</span>
            <p className="testimonials__text">Discover reviews from our customers about their experiences with our products and customer service. Find out what others have to say about our brand and see why it's worth trusting us.</p>
            <div className="testimonials__items">
                {TestimonialsItems
                .sort(() => Math.random() - 0.5) 
                .map(item => (
                    <TestimonialsItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}