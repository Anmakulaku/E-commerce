import './TestimonialsItem.css';

type TestimonialsItemProps = {
  id: number;
  text: string;
  name: string;
  profession: string;
  img: string;
  webpImg: string;
  isMain: boolean;
};

export function TestimonialsItem({
  id,
  img,
  webpImg,
  text,
  name,
  profession,
  isMain,
}: TestimonialsItemProps) {
  return (
    <div className={`testimonialsItem section__margin ${isMain ? 'main' : ''}`}>
      <div key={id} className='testimonialsItem__container'>
        <div className='testimonialsItem__img'>
          <div className='testimonialsItem__imgBg'></div>
          <picture>
            <source srcSet={webpImg} type='image/webp' />
            <img src={img} alt='testimonials image' />
          </picture>
        </div>
        <div className='testimonialsItem__infoBox'>
          <div className='testimonialsItem__user'>
          <span className='testimonialseItem__name'>{name}</span>
          <span className='testimonialsItem__profession'>{profession}</span>
          <div className='testimonialsItem__stars'></div>
          </div>
          <p className='testimonialsItem__text'>{text}</p>
        </div>
      </div>
    </div>
  );
}
