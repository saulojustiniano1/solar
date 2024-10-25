import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  };
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
