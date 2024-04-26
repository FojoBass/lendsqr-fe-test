import { ImSpinner9 } from 'react-icons/im';

const Spinner = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={`spinner ${isActive ? 'active' : ''}`}>
      <span className='icon'>
        <ImSpinner9 />
      </span>
    </div>
  );
};

export default Spinner;
