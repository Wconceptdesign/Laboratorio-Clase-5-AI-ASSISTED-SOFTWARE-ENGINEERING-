import { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, Alert } from '@mui/material';
import api from '../services/api';
import { EmployeeContext } from '../contexts/EmployeeContext';
import { format } from 'date-fns';

export default function Ingreso() {
  const { currentEmployee, setCurrentEmployee } = useContext(EmployeeContext);
  const [docId, setDocId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [hasLaptop, setHasLaptop] = useState(false);
  const [brand, setBrand] = useState('');
  const [serial, setSerial] = useState('');
  const [authorizer, setAuthorizer] = useState('');

  const handleSearch = async () => {
    try {
      setError(''); setSuccess(false);
      const res = await api.get(`/employees/${docId}`);
      setCurrentEmployee(res.data);
    } catch (err) {
      setError('Empleado no encontrado o error en sistema.');
      setCurrentEmployee(null);
    }
  };

  const handleSubmit = async () => {
    try {
      if (hasLaptop && (!brand || !serial || !authorizer)) {
        setError('Ingrese todos los campos del equipo portátil');
        return;
      }
      await api.post('/entries', {
        documentId: docId,
        hasLaptop,
        laptopBrand: brand,
        laptopSerial: serial,
        authorizedBy: authorizer,
      });
      setSuccess(true);
      setCurrentEmployee(null);
      setDocId('');
      setHasLaptop(false);
      setBrand(''); setSerial(''); setAuthorizer('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error registrando ingreso');
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>Registro de Ingreso</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Ingreso registrado con éxito</Alert>}

      <Box display="flex" gap={2} mb={3}>
        <TextField 
          label="Documento de Identidad" 
          value={docId} 
          onChange={(e) => setDocId(e.target.value)} 
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch}>Buscar</Button>
      </Box>

      {currentEmployee && (
        <Box bgcolor="#e3f2fd" p={2} borderRadius={2} mb={3}>
          <Typography variant="subtitle1"><b>Empleado:</b> {currentEmployee.full_name}</Typography>
          <Typography variant="subtitle1"><b>Hora:</b> {format(new Date(), 'dd/MM/yyyy HH:mm')}</Typography>

          <Box mt={2}>
            <FormControlLabel
              control={<Checkbox checked={hasLaptop} onChange={(e) => setHasLaptop(e.target.checked)} />}
              label="¿Ingresa computador?"
            />
          </Box>

          {hasLaptop && (
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField label="Marca del computador" value={brand} onChange={e => setBrand(e.target.value)} required />
              <TextField label="Serial del computador" value={serial} onChange={e => setSerial(e.target.value)} required />
              <TextField label="Persona que autoriza" value={authorizer} onChange={e => setAuthorizer(e.target.value)} required />
            </Box>
          )}

          <Button variant="contained" color="success" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
            Registrar Ingreso
          </Button>
        </Box>
      )}
    </Box>
  );
}
