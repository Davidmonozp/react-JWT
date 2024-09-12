import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Button, CircularProgress, Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const activosTypes = [
    'Computadores',
    'Monitores',
    'Impresoras',
    'Dispositivos',
    'Software',
    'Servidores',
    'Red',
    'Diademas',
    'Camaras',
    'Telefonos',
    'Mobiliario'
];

const computadorTypes = [
    'Portátil',
    'Escritorio'
];

export const ActivosForm = () => {
    const location = useLocation();
    const { state } = location; // Obtener el estado pasado desde la navegación
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [type, setType] = useState(state?.type || ''); // Establecer el tipo inicial desde el estado de navegación
    const [serialNumber, setSerialNumber] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Current type from state:', state?.type); // Depura aquí
        if (state?.type) {
            setType(state.type);
        }
    }, [state]);

    const handleDetailChange = (field, value) => {
        setDetails(prevDetails => ({ ...prevDetails, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log({
            name,
            type,
            serial_number: serialNumber,
            description,
            details
        });

        try {
            await axios.post('http://127.0.0.1:8000/api/activos', {
                name,
                type,
                serial_number: serialNumber,
                description,
                details
            });

            // SweetAlert2
            Swal.fire({
                title: 'Éxito!',
                text: 'Activo agregado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                setName('');
                setType('');
                setSerialNumber('');
                setDescription('');
                setDetails({});
                navigate('/');
            });
        } catch (error) {
            setError('¡Hubo un error al guardar el activo!');
            Swal.fire({
                title: 'Error!',
                text: '¡Hubo un error al guardar el activo!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ mt: 8, mx: 'auto', maxWidth: 800 }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>
                    {type ? `Agregar ${type}` : 'Agregar Activo'}
                </Typography>
                <TextField
                    label="Marca"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    margin="dense"
                />
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    displayEmpty
                    required
                    fullWidth
                    margin="dense"
                >
                    <MenuItem value="" disabled>Select type</MenuItem>
                    {activosTypes.map((activoType) => (
                        <MenuItem key={activoType} value={activoType}>{activoType}</MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Serial Number"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    required
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    margin="dense"
                />
                {type === 'Computadores' && (
                    <>
                        <Select
                            value={details?.computer_type || ''}
                            onChange={(e) => handleDetailChange('computer_type', e.target.value)}
                            displayEmpty
                            fullWidth
                            margin="dense"
                        >
                            <MenuItem value="" disabled>Tipo de computador</MenuItem>
                            {computadorTypes.map((computerType) => (
                                <MenuItem key={computerType} value={computerType}>{computerType}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label="Processor"
                            onChange={(e) => handleDetailChange('processor', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="RAM"
                            type="number"
                            onChange={(e) => handleDetailChange('ram', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Disco duro"
                            onChange={(e) => handleDetailChange('storage', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Monitores' && (
                    <>
                        <TextField
                            label="Resolution"
                            onChange={(e) => handleDetailChange('resolution', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Size"
                            type="number"
                            onChange={(e) => handleDetailChange('size', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Impresoras' && (
                    <>
                        <TextField
                            label="Modelo"
                            onChange={(e) => handleDetailChange('model', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Tipo de tinta"
                            onChange={(e) => handleDetailChange('ink_type', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Dispositivos' && (
                    <>
                        <TextField
                            label="Tipo de dispositivo"
                            onChange={(e) => handleDetailChange('device_type', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Marca"
                            onChange={(e) => handleDetailChange('device_brand', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Software' && (
                    <>
                        <TextField
                            label="Nombre del software"
                            onChange={(e) => handleDetailChange('software_name', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Versión"
                            onChange={(e) => handleDetailChange('software_version', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Servidores' && (
                    <>
                        <TextField
                            label="Modelo"
                            onChange={(e) => handleDetailChange('server_model', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Capacidad de almacenamiento"
                            onChange={(e) => handleDetailChange('storage_capacity', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Red' && (
                    <>
                        <TextField
                            label="Tipo de red"
                            onChange={(e) => handleDetailChange('network_type', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Velocidad"
                            onChange={(e) => handleDetailChange('network_speed', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Diademas' && (
                    <>
                        <TextField
                            label="Modelo"
                            onChange={(e) => handleDetailChange('headset_model', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Tipo"
                            onChange={(e) => handleDetailChange('headset_type', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Camaras' && (
                    <>
                        <TextField
                            label="Resolución"
                            onChange={(e) => handleDetailChange('camera_resolution', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Tipo"
                            onChange={(e) => handleDetailChange('camera_type', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Telefonos' && (
                    <>
                        <TextField
                            label="Modelo"
                            onChange={(e) => handleDetailChange('phone_model', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Tipo"
                            onChange={(e) => handleDetailChange('phone_type', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}
                {type === 'Mobiliario' && (
                    <>
                        <TextField
                            label="Tipo de mobiliario"
                            onChange={(e) => handleDetailChange('furniture_type', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Material"
                            onChange={(e) => handleDetailChange('furniture_material', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    </>
                )}

                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Agregar activo'}
                </Button>
            </form>
        </Box>
    );
};
