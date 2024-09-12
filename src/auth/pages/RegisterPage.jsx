import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useDispatch } from 'react-redux';
import { startRegister } from '../../store/auth/thunk';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await dispatch(startRegister({
        name: fullName,
        email,
        password,
        password_confirmation: confirmPassword,
      }));
      console.log('Redirigiendo a /auth/login');
      navigate('/auth/login'); 
    } catch (err) {
      setError('Error en el registro. Inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Registro">
      <form onSubmit={handleRegister} className='animate__animated animate__headShake'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Grid>
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
            <TextField
              label="Confirmar Contraseña"
              type="password"
              placeholder="Confirmar Contraseña"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Crear Usuario'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
