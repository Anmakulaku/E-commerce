import { useState } from 'react';

export function useSubscribeLogic() {
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
            setIsSubscribed(false);
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

    return {
        email,
        emailError,
        isValidEmail,
        isSubscribed,
        handleInputChange,
        handleSubscribe,
        handleEnterKeyPress,
        closeModal
    };
}
