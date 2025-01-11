import './Testimonials.css';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useTestimonialsLogic } from './TestimonialsLogic';

export function Testimonials() {
  const { nextSlide, prevSlide, renderTestimonialsItems, isMobile } =
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
      <nav
        className={`testimonials__arrowBox ${
          isMobile ? 'testimonials__navigation--mobile' : ''
        }`}
        aria-label='Testimonials navigation'
      >
        <button
          className='testimonials__arrow testimonials__prevArrow'
          onClick={prevSlide}
          aria-label='Previous testimonial'
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <button
          className='testimonials__arrow testimonials__nextArrow'
          onClick={nextSlide}
          aria-label='Next testimonial'
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </nav>
    </section>
  );
}
