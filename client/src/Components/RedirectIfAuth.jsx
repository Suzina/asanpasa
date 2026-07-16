import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

export default function RedirectIfAuth() {
  const { auth } = useContext(AuthContext);
  const token = auth?.accessToken || sessionStorage.getItem("accessToken");

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}