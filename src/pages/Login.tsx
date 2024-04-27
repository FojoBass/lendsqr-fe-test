import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/images/pablo-sign-in 1.png';
import Logo from '../assets/icons/logo.svg?react';
import Spinner from '../components/Spinner';
import { regex } from '../data';
import { useGlobalContext } from '../contexts/appContext';
import { dropdownHandler } from '../helpers';

interface FormErrInt {
  state: boolean;
  msg: string;
  target: 'email' | 'pword' | '';
}

const Login = () => {
  const [isVisble, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ErrElRefs = useRef<HTMLDivElement[]>([]);
  const [err, setErr] = useState<FormErrInt>({
    state: false,
    msg: '',
    target: '',
  });
  const navigate = useNavigate();
  const { setIsAuthed } = useGlobalContext();

  const validateEmail = (): boolean => {
    if (!email) {
      setErr({ state: true, msg: 'Enter email', target: 'email' });
      return false;
    }

    if (!regex.email.test(email)) {
      setErr({ state: true, msg: 'Enter valid email', target: 'email' });
      return false;
    }

    return true;
  };

  const validatePassword = (): boolean => {
    if (!password) {
      setErr({ state: true, msg: 'Enter password', target: 'pword' });
      return false;
    }

    if (password.length < 6) {
      setErr({
        state: true,
        msg: 'Password should be atleast 6 chars',
        target: 'pword',
      });
      return false;
    }

    return true;
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      setIsLoading(true);
      setIsAuthed && setIsAuthed(true);

      setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard');
      }, 2000);
    }
  };

  useEffect(() => {
    if (err.state) {
      const targetEl = ErrElRefs.current.find(
        (el) => el.dataset.id === err.target
      )!;
      const childEl = targetEl.children[0];
      childEl.textContent = err.msg;

      dropdownHandler(targetEl, childEl as HTMLElement, true);

      const timer = setTimeout(() => {
        dropdownHandler(targetEl, childEl as HTMLElement, false);
      }, 3000);

      const timer2 = setTimeout(() => {
        setErr({ state: false, msg: '', target: '' });
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [err]);

  useEffect(() => {
    document.title = 'Lendsqr | Login';
  }, []);

  return (
    <section id='login'>
      <div className='left_side'>
        <div className='center'>
          <Link to='/' className='logo'>
            <Logo />
          </Link>

          <div className='img_wrapper'>
            <img src={loginImg} alt='img' />
          </div>
        </div>
      </div>

      <div className='right_side'>
        <div className='center'>
          <header>
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
          </header>

          <form action='' onSubmit={handleSubmit} noValidate>
            <div className='form_opt'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div
                className='err_msg'
                ref={(el) => {
                  el &&
                    !ErrElRefs.current.some((rel) => rel === el) &&
                    ErrElRefs.current.push(el);
                }}
                data-id={'email'}
              >
                <p>This is an error</p>
              </div>
            </div>

            <div className='form_opt pword'>
              <input
                type={isVisble ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={() => setIsVisible(!isVisble)}>
                {isVisble ? 'hide' : 'show'}
              </button>
              <div
                className='err_msg'
                ref={(el) => {
                  el &&
                    !ErrElRefs.current.some((rel) => rel === el) &&
                    ErrElRefs.current.push(el);
                }}
                data-id={'pword'}
              >
                <p>This is an error</p>
              </div>
            </div>

            <Link className='forgot' to='/'>
              Forgot password?
            </Link>

            <button className='login_btn' disabled={isLoading}>
              Log in
              <Spinner isActive={isLoading} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
