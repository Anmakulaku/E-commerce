import "./TestimonialsItem.css"

type TestimonialsItemProps = {
    id: number;
    text: string;
    name: string;
    profession: string;
    img: string;
}

export function TestimonialsItem ({ id, img, text, name, profession }: TestimonialsItemProps) {
    return (
            <div key={id} className="testimonialsItem__container">
                <div className="testimonialsItem__img">
                    <img src={img} alt="testimonials image" />
                </div>
                <div className="testimonialsItem__box">
                    <p className="testimonialsItem__text">{text}</p>
                    <h1 className="testimonialseItem__name">{name}</h1>
                    <span className="testimonialsItem__profession">{profession}</span>
                    
                </div>
            </div>
    );
}