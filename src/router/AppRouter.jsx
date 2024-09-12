import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes'; 
import PrivateRoute from './PrivateRoute';
import { ClientRoutes } from '../client/routes/ClientRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes/>} />
      {/* <Route element={<PrivateRoute />}> */}
        <Route path="/*" element={<ClientRoutes />} />
      {/* </Route> */}
    </Routes>
  );
};


