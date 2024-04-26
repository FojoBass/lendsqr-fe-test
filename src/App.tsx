import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/dashboard/Users';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Users />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
