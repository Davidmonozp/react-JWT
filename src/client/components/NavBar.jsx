import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Box, Button, Menu } from '@mui/material';
import { MenuOutlined, LogoutOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunk';
import { Asistencia } from './asistencia/Asistencia';
import { Gestion } from './gestion/Gestion';
import { Activos } from './activos/Activos';

const navItems = ['Activos', 'Asistencia', 'Gestión', 'Herramientas', 'Plugins', 'Administracion', 'Configuración'];

export const NavBar = ({ drawerWidth = 240 }) => {
  const [anchorElAsistencia, setAnchorElAsistencia] = useState(null);
  const [anchorElGestion, setAnchorElGestion] = useState(null);
  const [anchorElActivos, setAnchorElActivos] = useState(null);
  const [activeItem, setActiveItem] = useState(null); // Estado para el botón activo
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(startLogout());
      console.log('El usuario ha cerrado sesión');
      navigate('/auth/login');
    } catch (error) {
      console.error('Error en el logout:', error);
    }
  };

  const handleClickAsistencia = (event) => {
    setAnchorElAsistencia(event.currentTarget);
    setActiveItem('Asistencia'); // Establece el botón activo
  };

  const handleClickGestion = (event) => {
    setAnchorElGestion(event.currentTarget);
    setActiveItem('Gestión'); // Establece el botón activo
  };

  const handleClickActivos = (event) => {
    setAnchorElActivos(event.currentTarget);
    setActiveItem('Activos'); // Establece el botón activo
  };

  const handleClose = () => {
    setAnchorElAsistencia(null);
    setAnchorElGestion(null);
    setAnchorElActivos(null);
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
        ml: { sm: `${drawerWidth}px`, xs: 0 },
        transition: 'margin 0.3s ease',
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          sx={{ display: { xs: 'block', sm: 'none' }, mr: 2 }}
        >
          <MenuOutlined />
        </IconButton>

        <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
          ClientApp
        </Typography>

        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexGrow: 2,
            justifyContent: 'flex-start',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: '100%',
              gap: 2
            }}
          >
            {navItems.map((item) => {
              const isActive = activeItem === item; // Verifica si el botón es el activo

              if (item === 'Asistencia') {
                return (
                  <Button
                    key={item}
                    sx={{
                      color: isActive ? '#ffeb3b' : '#fff', // Cambia el color si está activo
                      backgroundColor: isActive ? '#0d47a1' : 'transparent', // Cambia el fondo si está activo
                      '&:hover': {
                        backgroundColor: '#0d47a1',
                        color: '#fff',
                        opacity: 0.9
                      },
                      margin: 1
                    }}
                    onClick={handleClickAsistencia}
                  >
                    {item}
                    <ExpandMoreOutlined />
                  </Button>
                );
              }

              if (item === 'Gestión') {
                return (
                  <Button
                    key={item}
                    sx={{
                      color: isActive ? '#ffeb3b' : '#fff',
                      backgroundColor: isActive ? '#0d47a1' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#0d47a1',
                        color: '#fff',
                        opacity: 0.9
                      },
                      margin: 1
                    }}
                    onClick={handleClickGestion}
                  >
                    {item}
                    <ExpandMoreOutlined />
                  </Button>
                );
              }

              if (item === 'Activos') {
                return (
                  <Button
                    key={item}
                    sx={{
                      color: isActive ? '#ffeb3b' : '#fff',
                      backgroundColor: isActive ? '#0d47a1' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#0d47a1',
                        color: '#fff',
                        opacity: 0.9
                      },
                      margin: 1
                    }}
                    onClick={handleClickActivos}
                  >
                    {item}
                    <ExpandMoreOutlined />
                  </Button>
                );
              }
              return (
                <Button
                  key={item}
                  sx={{
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#0d47a1',
                      color: '#fff',
                      opacity: 0.9
                    },
                    margin: 1
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </Box>

          <Asistencia
            anchorElAsistencia={anchorElAsistencia}
            handleClose={handleClose}
          />

          <Gestion
            anchorElGestion={anchorElGestion}
            handleClose={handleClose}
          />

          <Activos
            anchorElActivos={anchorElActivos}
            handleClose={handleClose}
          />
        </Box>

        <IconButton
          color='error'
          onClick={handleLogout}
          sx={{
            ml: 2,
            color: '#ff1744',
            '&:hover': {
              backgroundColor: 'rgba(255, 23, 68, 0.2)',
              color: '#ff1744',
              opacity: 1,
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease',
            },
          }}
        >
          <LogoutOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
