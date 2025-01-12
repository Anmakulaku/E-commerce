import { useState } from 'react';

export function useSubscribeLogic() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };


  const handleSubscribe = () => {

    if (email === '' || !email.includes('@') || !email.includes('.')) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
      setIsSubscribed(true);
      // console.log('Subscribed with email:', email);
      setEmail('');
    }
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleSubscribe();
    }
  };

  const onCloseClick = () => {
    setIsSubscribed(false);
  };

  return {
    email,
    emailError,
    isSubscribed,
    handleInputChange,
    handleSubscribe,
    handleEnterKeyPress,
    onCloseClick,
  };
}
