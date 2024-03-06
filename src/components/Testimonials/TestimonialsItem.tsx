import "./TestimonialsItem.css"

type TestimonialsItemProps = {
    id: number;
    text: string;
    name: string;
    profession: string;
    img: string;
    isMain: boolean;
}

export function TestimonialsItem ({ id, img, text, name, profession, isMain }: TestimonialsItemProps) {
    return (
        <div className={`testimonialsItem section__margin ${isMain ? "main" : ""}`}>
            <div key={id} className="testimonialsItem__container">
                <div className="testimonialsItem__img">
                    <div className="testimonialsItem__imgBg"></div>
                    <img src={img} alt="testimonials image" />
                </div>
                <div className="testimonialsItem__infoBox">
                    <p className="testimonialsItem__text">{text}</p>
                    <div className="testimonialsItem__stars" >
                    </div>
                    <span className="testimonialseItem__name">{name}</span>
                    <span className="testimonialsItem__profession">{profession}</span>
                    
                </div>
            </div>
        </div>
    );
}