import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert, Paper, Divider, Button, Collapse, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const categories = ['Computadores', 'Monitores', 'Impresoras', 'Dispositivos', 'Software', 'Servidores', 'Red', 'Diademas', 'Camaras', 'Telefonos', 'Mobiliario'];

export const ActivosList = () => {
    const [activos, setActivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expandedItemId, setExpandedItemId] = useState(null);
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchActivos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/activos');
                setActivos(response.data);
            } catch (err) {
                setError('No se pudo cargar la lista de activos.');
            } finally {
                setLoading(false);
            }
        };

        fetchActivos();
    }, []);

    const filteredActivos = selectedCategory
        ? activos.filter(activo => activo.type === selectedCategory)
        : activos;

    const handleExpandClick = (id) => {
        setExpandedItemId(expandedItemId === id ? null : id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/activos/${id}`);
            setActivos(activos.filter(activo => activo.id !== id)); // Actualiza el estado local para reflejar la eliminación
            Swal.fire({
                title: 'Éxito!',
                text: 'Activo eliminado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        } catch (error) {
            console.error('Error al eliminar activo:', error); // Imprime el error en la consola para mayor detalle
            Swal.fire({
                title: 'Error!',
                text: '¡Hubo un error al eliminar el activo!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    const handleEdit = (activo) => {
        navigate('/edit', { state: { activo } }); // Navegar a la página de edición
    };

    return (
        <Box sx={{ mt: 8, mx: 'auto', maxWidth: 1200 }}>
            <Typography variant="h4" gutterBottom align="center">
                Lista de Activos
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <>
                    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', overflowX: 'auto' }}>
                        {categories.map(category => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                variant={selectedCategory === category ? 'contained' : 'outlined'}
                                sx={{
                                    margin: 1,
                                    minWidth: 120,
                                    padding: '8px 16px',
                                    borderColor: selectedCategory === category ? '#8fd0a2' : '#a0e1b1',
                                    color: selectedCategory === category ? '#ffffff' : '#029964',
                                    backgroundColor: selectedCategory === category ? '#8fd0a2' : 'transparent',
                                    '&:hover': {
                                        borderColor: '#8ed9a8',
                                        backgroundColor: '#e1f7e5',
                                    },
                                    '& .MuiTypography-root': {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    },
                                }}
                            >
                                {category}
                            </Button>
                        ))}
                    </Box>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <List>
                            {filteredActivos.length === 0 ? (
                                <Typography variant="body1" align="center">
                                    No hay activos disponibles para la categoría seleccionada.
                                </Typography>
                            ) : (
                                filteredActivos.map(activo => (
                                    <React.Fragment key={activo.id}>
                                        <ListItem
                                            sx={{
                                                borderBottom: '1px solid #ddd',
                                                padding: '16px',
                                                backgroundColor: '#f9f9f9',
                                                borderRadius: '4px',
                                                '&:hover': {
                                                    backgroundColor: '#f1f1f1',
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={<Typography variant="h6">{activo.name}</Typography>}
                                                secondary={
                                                    <Typography variant="body2" color="textSecondary">
                                                        Tipo: {activo.type} <br />
                                                        Serial: {activo.serial_number}
                                                    </Typography>
                                                }
                                                onClick={() => handleExpandClick(activo.id)}
                                            />
                                            <Collapse in={expandedItemId === activo.id}>
                                                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <IconButton onClick={() => handleEdit(activo)} color="primary" sx={{ mb: 1 }}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton onClick={() => handleDelete(activo.id)} color="error">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Box sx={{ flexGrow: 1, ml: 2 }}>
                                                        <Typography variant="body2">
                                                            <strong>Descripción:</strong> {activo.description}
                                                        </Typography>
                                                        {activo.details && (
                                                            <>
                                                                {Object.entries(activo.details).map(([key, value]) => (
                                                                    <Typography key={key} variant="body2">
                                                                        <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                                                                    </Typography>
                                                                ))}
                                                            </>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Collapse>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))
                            )}
                        </List>
                    </Paper>
                </>
            )}
        </Box>
    );
};
