import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Laptop, ScreenshotMonitor, Print, DevicesOtherRounded, Terminal, Dns, Router, HeadsetMic, Videocam, PhoneAndroid, EventSeat, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const Activos = ({ anchorElActivos, handleClose }) => {
  const navigate = useNavigate();
  const handleMenuItemClick = (type) => {
    handleClose();
    if (type === 'Ver') {
      navigate('/activos/list'); // Redirige a la lista de activos
    } else {
      navigate('/activos/form', { state: { type } }); // Redirige al formulario con el tipo de activo
    }
  };

  return (
    <Menu
      anchorEl={anchorElActivos}
      open={Boolean(anchorElActivos)}
      onClose={handleClose}
      sx={{ mt: '45px' }}
    >
       <MenuItem onClick={() => handleMenuItemClick('Ver')}>
        <ListItemIcon>
          <Visibility fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Ver" />
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('Computadores')}>
        <ListItemIcon>
          <Laptop fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Computadores" />
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('Monitores')}>
        <ListItemIcon>
          <ScreenshotMonitor fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Monitores" />
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('Impresoras')}>
        <ListItemIcon>
          <Print fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Impresoras" />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('Dispositivos')}>
        <ListItemIcon>
          <DevicesOtherRounded fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Dispositivos" />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('Software')}>
        <ListItemIcon>
          <Terminal fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Software" />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('Servidores')}>
        <ListItemIcon>
          <Dns fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Servidores" />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('Red')}>
        <ListItemIcon>
          <Router fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Red" />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('Diademas')}>
        <ListItemIcon>
          <HeadsetMic fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Diademas" />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('Camaras')}>
        <ListItemIcon>
          <Videocam fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Camaras" />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('Telefonos')}>
        <ListItemIcon>
          <PhoneAndroid fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Telefonos" />
      </MenuItem>

      <MenuItem onClick={() => handleMenuItemClick('Mobiliario')}>
        <ListItemIcon>
          <EventSeat fontSize='small' />
        </ListItemIcon>
        <ListItemText primary="Mobiliario" />
      </MenuItem>
    </Menu>
  );
};