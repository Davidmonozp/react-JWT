import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, CircularProgress, Alert, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ActivosEditForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { activo } = location.state || {};
    
    const [name, setName] = useState(activo?.name || '');
    const [type, setType] = useState(activo?.type || '');
    const [serialNumber, setSerialNumber] = useState(activo?.serial_number || '');
    const [description, setDescription] = useState(activo?.description || '');
    const [details, setDetails] = useState(activo?.details || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [computerType, setComputerType] = useState(details?.computer_type || '');
    const [computadorTypes, setComputadorTypes] = useState(['Escritorio', 'Portátil']); // Opciones de tipo de computador

    const handleDetailChange = (field, value) => {
        setDetails(prevDetails => ({ ...prevDetails, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`http://127.0.0.1:8000/api/activos/${activo.id}`, {
                name,
                type,
                serial_number: serialNumber,
                description,
                details: { ...details, computer_type: computerType } // Incluye el campo computer_type en details
            });

            Swal.fire({
                title: 'Éxito!',
                text: 'Activo actualizado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            setError('¡Hubo un error al actualizar el activo!');
            Swal.fire({
                title: 'Error!',
                text: '¡Hubo un error al actualizar el activo!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ mt: 8, mx: 'auto', maxWidth: 600, p: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
                Editar Activo
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Tipo"
                        fullWidth
                        margin="normal"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <TextField
                        label="Número de Serie"
                        fullWidth
                        margin="normal"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                    />
                    <TextField
                        label="Descripción"
                        fullWidth
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {type === 'Computadores' && (
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Tipo de Computador</InputLabel>
                            <Select
                                value={computerType}
                                onChange={(e) => setComputerType(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>Tipo de computador</MenuItem>
                                {computadorTypes.map((type, index) => (
                                    <MenuItem key={index} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {Object.keys(details).map((key, index) => key !== 'computer_type' && (
                        <TextField
                            key={index}
                            label={key.replace(/_/g, ' ')}
                            fullWidth
                            margin="normal"
                            value={details[key]}
                            onChange={(e) => handleDetailChange(key, e.target.value)}
                        />
                    ))}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Actualizar
                    </Button>
                </form>
            )}
        </Box>
    );
};
