import { Box, Divider, Drawer, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerWidth = 240 }) => {

    const user = useSelector((state) => state.auth.user);
    

    return (
        <Box componet='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {user ? user.name : 'No autenticado'}
                    </Typography>
                </Toolbar>
                <Divider />

            </Drawer>

        </Box>
    )
}
