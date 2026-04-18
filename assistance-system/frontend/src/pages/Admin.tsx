import { useState } from 'react';
import { Box, Button, Typography, Alert, TextField } from '@mui/material';
import api from '../services/api';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      setToken(res.data.token);
      setIsLoggedIn(true);
      setError('');
    } catch (err: any) {
      setError('Credenciales incorrectas');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get('/reports/export', { 
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'registro_asistencia.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (err) {
      console.error(err);
      alert("Error descargando el archivo. Por favor inicie sesión nuevamente.");
      setIsLoggedIn(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
        <Typography variant="h5" mb={2}>Acceso Restringido</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField 
          label="Usuario" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth 
          required 
          sx={{ mb: 2 }}
        />
        <TextField 
          label="Contraseña" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth 
          required 
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Iniciar Sesión
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>Panel Administrativo</Typography>
      <Alert severity="success" sx={{ mb: 3 }}>
        Autenticación exitosa. Desde aquí puede exportar todos los registros de ingreso y salida recopilados en el sistema en formato Excel, detallando nombre, hora y estado de los equipos.
      </Alert>
      <Button variant="contained" color="primary" fullWidth onClick={handleDownload}>
        Descargar Informe Completo (.xlsx)
      </Button>
      <Button variant="text" color="error" fullWidth sx={{ mt: 2 }} onClick={() => setIsLoggedIn(false)}>
        Cerrar Sesión
      </Button>
    </Box>
  );
}
