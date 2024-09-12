// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { status } = useSelector((state) => state.auth);

  if (status === 'checking') {
    // Opcional: Puedes mostrar un spinner o algo mientras se verifica el estado
    return <div>Loading...</div>;
  }

  if (status === 'not_authenticated') {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;









