import './Skeleton.css';

const Skeleton = ({ width = '100%', height = '100%' }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export default Skeleton;
