import { Outlet, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contexts/appContext';
import { useEffect } from 'react';
import DashNav from './DashNav';
import { DashboardProvider } from '../../contexts/dashboardContext';
import DashSideNav from './DashSideNav';

const Dashboard = () => {
  const { isAuthed } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed) navigate('/', { replace: true });

    document.title = 'Lendsqr | Dashboard';
  }, []);

  return (
    <DashboardProvider>
      <section id='dashboard'>
        <DashNav />

        <main className='dash_main'>
          <DashSideNav />
          <div className='dash_sect'>
            <Outlet />
          </div>
        </main>
      </section>
    </DashboardProvider>
  );
};

export default Dashboard;
