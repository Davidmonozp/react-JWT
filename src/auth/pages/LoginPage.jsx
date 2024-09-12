
import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { startLogin } from '../../store/auth/thunk'; // Importa el thunk


export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Crea una instancia del hook useNavigate
  const { status, error } = useSelector(state => state.auth); 

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(startLogin({ email, password })); // Envía un objeto con email y password
  };

    // Redirige al usuario si el inicio de sesión es exitoso
    useEffect(() => {
      if (status === 'authenticated') {
        navigate('/'); // Redirige a la ruta deseada
      }
    }, [status, navigate]);
  

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin} className='animate__animated animate__headShake'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};





// import React, { useState } from 'react';
// import { Button, Grid, TextField } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthLayout } from '../layout/AuthLayout';

// export const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {

//       const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
//         email,
//         password,
//       });

  
//       console.log('Login successful', response.data);

//       localStorage.setItem('token', response.data.access_token);
  
//       navigate('/');
//     } catch (error) {
//       console.error('Login error', error);
//     }
//   };

//   return (
//     <AuthLayout title="Login">
//       <form onSubmit={handleLogin}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Correo"
//               type="email"
//               placeholder="correo@gmail.com"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Contraseña"
//               type="password"
//               placeholder="Contraseña"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Ingresar
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </AuthLayout>
//   );
// };
