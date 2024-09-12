import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { ConfirmationNumber, Create, Warning, ChangeCircle, CalendarMonth, BarChart, ErrorOutline, ListAlt } from '@mui/icons-material';


export const Asistencia = ({ anchorElAsistencia, handleClose }) => {
    return (
        <Menu
            anchorEl={anchorElAsistencia}
            open={Boolean(anchorElAsistencia)}
            onClose={handleClose}
            sx={{ mt: '45px' }}
        >
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <ConfirmationNumber fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Tiquetes" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Create fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Crear ticket" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Warning fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Problemas" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <ChangeCircle fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Cambios" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <CalendarMonth fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Planificación" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <BarChart fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Estadísticas" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <ErrorOutline fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Incidentes recurrentes" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <ListAlt fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Forms" />
            </MenuItem>
        </Menu>
    );
};