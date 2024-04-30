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
import SingleUser from './pages/dashboard/SingleUser';
import Error from './pages/Error';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />} errorElement={<Error />}>
        <Route index element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Users />} />
          <Route path=':id' element={<SingleUser />} />
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
