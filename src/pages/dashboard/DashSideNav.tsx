import { Briefcase, Home, Logout } from '../../icons';
import { dashSideNavOpts } from '../../data';
import { IoIosArrowDown } from 'react-icons/io';
import { useDashBoardContext } from '../../contexts/dashboardContext';
import { useGlobalContext } from '../../contexts/appContext';
import { useNavigate } from 'react-router-dom';

const DashSideNav = () => {
  const { isSideNav } = useDashBoardContext();
  const { setIsAuthed } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <aside className={`dash_sidenav ${isSideNav ? 'active' : ''}`}>
      <div className='wrapper'>
        <div className='top'>
          <button className='sidenav_opt'>
            <span className='icon'>
              <Briefcase />
            </span>
            Switch Organization
            <span className='icon'>
              <IoIosArrowDown />
            </span>
          </button>

          <button className='sidenav_opt'>
            <span className='icon'>
              <Home />
            </span>
            Dashboard
          </button>
        </div>

        <div className='mid'>
          {dashSideNavOpts.map(({ heading, opts }) => (
            <div className='sidenav_opts' key={heading}>
              <h3>{heading}</h3>
              <div className='sidenav_opt_wrapper'>
                {opts.map(({ Icon, title }) => (
                  <button
                    className={`sidenav_opt ${
                      title === 'Users' ? 'active' : ''
                    }`}
                    key={title}
                  >
                    <span className='icon'>
                      <Icon />
                    </span>
                    {title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <footer className='bottom'>
          <button
            className='logout_btn sidenav_opt'
            onClick={() => {
              setIsAuthed && setIsAuthed(false);
              navigate('/');
            }}
          >
            <span className='icon'>
              <Logout />
            </span>
            Logout
          </button>

          <p className='sidenav_opt'>v1.2.0</p>
        </footer>
      </div>
    </aside>
  );
};

export default DashSideNav;
