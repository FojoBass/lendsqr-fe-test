import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/logo.svg?react';
import { FaCaretDown } from 'react-icons/fa';
import avi from '../../assets/images/image 4.png';
import { MdClose, MdMenu } from 'react-icons/md';
import { GoBell } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';
import { dropdownHandler } from '../../helpers';
import { useDashBoardContext } from '../../contexts/dashboardContext';

const DashNav = () => {
  const { isSideNav, setIsSideNav } = useDashBoardContext();
  const [isSearchDrop, setIsSearchDrop] = useState(false);
  const wRef = useRef<HTMLDivElement | null>(null);
  const cRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wEl = wRef.current;
    const cEl = cRef.current;

    if (wEl && cEl) dropdownHandler(wEl, cEl, isSearchDrop);
  }, [isSearchDrop]);

  return (
    <nav className='dash_nav'>
      <div className='top'>
        <div className='left_side'>
          <Link to='/dashboard' className='logo'>
            <Logo />
          </Link>

          <button
            className='search'
            onClick={() => setIsSearchDrop(!isSearchDrop)}
          >
            {isSearchDrop ? <MdClose /> : <CiSearch />}
          </button>

          <div className='search_wrapper'>
            <input type='text' placeholder='Search for anything' />
            <button className='search_btn'>
              <CiSearch />
            </button>
          </div>
        </div>

        <div className='right_side'>
          <Link className='docs' to='/dashboard'>
            Docs
          </Link>

          <button className='notification_btn'>
            <GoBell />
          </button>

          <div className='user_info'>
            <div className='img_wrapper'>
              <img src={avi} alt='user avi' />
            </div>
            <p>
              Adedeji
              <span className='icon'>
                <FaCaretDown />
              </span>
            </p>
          </div>

          <button
            className='menu_btn'
            onClick={() => setIsSideNav && setIsSideNav(!isSideNav)}
          >
            {isSideNav ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      <div className='bottom' ref={wRef}>
        <div className='content_wrapper' ref={cRef}>
          <input type='text' placeholder='Search for anything' />
          <button className='search_btn'>
            <CiSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
