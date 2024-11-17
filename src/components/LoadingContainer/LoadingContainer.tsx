import Skeleton from '../Skeleton/Skeleton';
import './LoadingContainer.css';

const LoadingContainer = () => {
  const placeholders = Array.from({ length: 12 }); 

  return (
    <div className='loadingContainer'>
      {placeholders.map((_, index) => (
        <div className='loadingItem' key={index}>
          <Skeleton width='100%' height='360px' />
          <Skeleton width='100%' height='25px' />
          <Skeleton width='100%' height='25px' />
        </div>
      ))}
    </div>
  );
};

export default LoadingContainer;
