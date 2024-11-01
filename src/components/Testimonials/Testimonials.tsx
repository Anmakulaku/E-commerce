import './Testimonials.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useTestimonialsLogic } from './TestimonialsLogic';

export function Testimonials() {
  const { nextSlide, prevSlide, renderTestimonialsItems } =
    useTestimonialsLogic();

  return (
    <section
      className='testimonials'
      role='region'
      aria-labelledby='testimonialsTitle'
    >
      <h1 id='testimonialsTitle' className='testimonials__title'>
        This Is What Our Customers Say
      </h1>
      <p className='testimonials__text'>
        Discover reviews from our customers about their experiences with our
        products and customer service. Find out what others have to say about
        our brand and see why it's worth trusting us.
      </p>
      <div className='testimonials__items'>{renderTestimonialsItems()}</div>
      <div className='testimonials__arrowBox'>
        <div
          className='testimonials__arrow testimonials__prevArrow'
          onClick={prevSlide}
          aria-label='Previous testimonial'
        >
          <MdKeyboardArrowLeft />
        </div>
        <div
          className='testimonials__arrow testimonials__nextArrow'
          onClick={nextSlide}
          aria-label='Next testimonial'
        >
          <MdKeyboardArrowRight />
        </div>
      </div>
    </section>
  );
}
