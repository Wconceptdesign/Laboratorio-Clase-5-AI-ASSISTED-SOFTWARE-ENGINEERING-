import { useState } from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, Alert } from '@mui/material';
import api from '../services/api';

export default function Salida() {
  const [docId, setDocId] = useState('');
  const [openEntry, setOpenEntry] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [withdrawLaptop, setWithdrawLaptop] = useState(false);
  const [verifier, setVerifier] = useState('');

  const handleSearch = async () => {
    try {
      setError(''); setSuccess(false);
      const res = await api.get(`/entries/open/${docId}`);
      if (res.data && res.data.id) {
        setOpenEntry(res.data);
      } else {
        setError('No tiene un ingreso activo hoy.');
        setOpenEntry(null);
      }
    } catch (err) {
      setError('Error al consultar registros.');
      setOpenEntry(null);
    }
  };

  const handleSubmit = async () => {
    try {
      if (openEntry.has_laptop && withdrawLaptop && !verifier) {
        setError('Especifique quién verifica el retiro del equipo');
        return;
      }
      await api.patch(`/entries/${openEntry.id}/exit`, {
        withdrawLaptop,
        verifiedBy: verifier,
      });
      setSuccess(true);
      setOpenEntry(null);
      setDocId('');
      setWithdrawLaptop(false);
      setVerifier('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error registrando salida');
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>Registro de Salida</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Salida registrada con éxito</Alert>}

      <Box display="flex" gap={2} mb={3}>
        <TextField 
          label="Documento de Identidad" 
          value={docId} 
          onChange={(e) => setDocId(e.target.value)} 
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch}>Buscar Ingreso</Button>
      </Box>

      {openEntry && (
        <Box bgcolor="#fff3e0" p={2} borderRadius={2} mb={3}>
          <Typography variant="subtitle1">Ingreso activo detectado: {new Date(openEntry.entry_time).toLocaleTimeString()}</Typography>

          {openEntry.has_laptop && (
            <Box mt={2} bgcolor="white" p={2} borderRadius={1}>
              <Typography variant="body2" color="error">Este empleado registró ingreso de portátil esta mañana.</Typography>
              <FormControlLabel
                control={<Checkbox checked={withdrawLaptop} onChange={(e) => setWithdrawLaptop(e.target.checked)} />}
                label="¿Retira el equipo ahora?"
              />
              {withdrawLaptop && (
                <TextField 
                  fullWidth sx={{ mt: 1 }}
                  label="Nombre de quien verifica el retiro" 
                  value={verifier} 
                  onChange={e => setVerifier(e.target.value)} 
                  required 
                />
              )}
            </Box>
          )}

          <Button variant="contained" color="warning" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
            Registrar Salida
          </Button>
        </Box>
      )}
    </Box>
  );
}
