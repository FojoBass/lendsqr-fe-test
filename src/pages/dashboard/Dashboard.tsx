import { Outlet, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { useEffect } from 'react';
import DashNav from './DashNav';

const Dashboard = () => {
  const { isAuthed } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed) navigate('/', { replace: true });
  }, []);

  return (
    <section id='dashboard'>
      <DashNav />
      <Outlet />
    </section>
  );
};

export default Dashboard;
