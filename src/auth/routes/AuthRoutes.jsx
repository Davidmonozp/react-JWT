import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
; // Asegúrate de que esta ruta sea correcta

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AuthRoutes; // Asegúrate de exportar el componente por defecto





// import React from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import { LoginPage } from '../pages/LoginPage'
// import { RegisterPage } from '../pages/RegisterPage'

// export const AuthRoutes = () => {
//     return (
//         <Routes>
//             <Route path="login" element={<LoginPage />} />
//             <Route path="register" element={<RegisterPage />} />
//             <Route path='/*' element={<Navigate to="/auth/login" />} />
//         </Routes>
//     )
// }
