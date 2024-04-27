import { Briefcase, Home } from '../../icons';
import { dashSideNavOpts } from '../../data';
import { IoIosArrowDown } from 'react-icons/io';

const DashSideNav = () => {
  return (
    <aside className='dash_sidenav'>
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

        <div className='bottom'>
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
      </div>
    </aside>
  );
};

export default DashSideNav;
