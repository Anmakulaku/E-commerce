import './Subscribe.css';
import subscribe1 from '../img/subscribe1.png';
import subscribe2 from '../img/subscribe2.png';
import { useState } from 'react';

export function Subscribe() {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
    
        if (!isValid) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
        
        setIsValidEmail(isValid);
    };

    const handleSubscribe = () => {
        validateEmail();
    
        if (isValidEmail) {
            console.log('Subscribed with email:', email);
            setIsSubscribed(true);
            setEmail(''); 
        } else {
            console.log('Invalid email address');
            setTimeout(() => {
                setIsSubscribed(false);
            }, 500);
        }
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubscribe();
        }
    };

    const closeModal = () => {
        setIsSubscribed(false); 
    };

    return (
        <div className='subscribe section__margin'>
            <div className='subscribe__grid'>
                <div className='subscribe__img'>
                    <img src={subscribe1} alt="man photo" className='subscribe__imgMan' />
                </div>
                <div className='subscribe__text'>
                    <span className='subscribe__title'>Subscribe To Our Newsletter</span>
                    <p className='subscribe__info'>Stay up-to-date with the latest discounts, exclusive offers, and never miss out on any opportunities! Subscribe to our newsletter and enjoy access to exclusive promotions.</p>
                    <div className='subscribe__buttonBox section__margin'>
                        <input
                            className={`subscribe__inputField ${isValidEmail ? '' : 'invalid'}`}
                            placeholder='Enter your email...'
                            value={email}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKeyPress}
                        />
                        {emailError && <p className='error-message'>{emailError}</p>}
                        <div className='subscribe__btnBg'>
                            <button className='button subscribe__btn' onClick={handleSubscribe}>
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>
                <div className='subscribe__img'>
                    <img src={subscribe2} alt="woman photo" className='subscribe__imgWoman'/>
                </div>
            </div>
            {isSubscribed && isValidEmail && (
                <div className={`modal ${isSubscribed ? 'show' : ''}`}>
                    <div className='modal-content'>
                        <p>Your subscription has been received.</p>
                        <span className='close' onClick={closeModal}>&times;</span>
                    </div>
                </div>
            )}
        </div>
    );
}
