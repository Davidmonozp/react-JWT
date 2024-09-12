import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Key, LocalAtm, LocalShipping, Person, FactCheck, FilePresent, Call, Beenhere } from '@mui/icons-material';
import React from 'react'

export const Gestion = ({ anchorElGestion, handleClose }) => {
    return (
        <>

            <Menu
                anchorEl={anchorElGestion}
                open={Boolean(anchorElGestion)}
                onClose={handleClose}
                sx={{ mt: '45px' }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Key fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary="Licencias" />
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LocalAtm fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary="Presupuestos" />
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LocalShipping fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary="Proveedores" />
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Person fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary="Contactos" />
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <FactCheck fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary="Contracts" />
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <FilePresent fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary="Documentos" />
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Call fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary="Líneas" />
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Beenhere fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary="Certificados" />
                </MenuItem>

            </Menu>
        </>
    )
}
