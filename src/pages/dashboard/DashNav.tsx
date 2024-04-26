import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/logo.svg?react';
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import { Bell } from '../../icons';
import avi from '../../assets/images/image 4.png';
import { MdMenu } from 'react-icons/md';

const DashNav = () => {
  return (
    <nav className='dash_nav'>
      <div className='top'>
        <div className='left_side'>
          <Link to='/dashboard' className='logo'>
            <Logo />
          </Link>

          <div className='search_wrapper'>
            <input type='text' placeholder='Search for anything' />
            <button className='search_btn'>
              <FaSearch />
            </button>
          </div>
        </div>

        <div className='right_side'>
          <Link className='docs' to='/dashboard'>
            Docs
          </Link>

          <button className='notification_btn'>
            <Bell />
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

          <button className='menu_btn'>
            <MdMenu />
          </button>
        </div>
      </div>
      <div className='bottom'>
        <input type='text' placeholder='Search for anything' />
        <button className='search_btn'>
          <FaSearch />
        </button>
      </div>
    </nav>
  );
};

export default DashNav;
