import { useNavigate } from 'react-router-dom';
import { LogoHalf } from '../icons';

const Error = () => {
  const navigate = useNavigate();

  return (
    <section className='err_sect'>
      <p className='logo'>
        4
        <span className='icon'>
          <LogoHalf />
        </span>
        4
      </p>
      <p className='text'>Page not found!</p>
      <button onClick={() => navigate(-1)}>Return back</button>
    </section>
  );
};

export default Error;
