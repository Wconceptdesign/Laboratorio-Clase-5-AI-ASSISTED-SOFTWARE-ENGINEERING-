import { CssBaseline, ThemeProvider, createTheme, Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Ingreso from './pages/Ingreso';
import Salida from './pages/Salida';
import Admin from './pages/Admin';
import { EmployeeProvider } from './contexts/EmployeeContext';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f4f6f8' },
  },
});

function Navigation() {
  const location = useLocation();
  const currentTab = location.pathname === '/' ? 0 : location.pathname === '/salida' ? 1 : 2;

  return (
    <Tabs value={currentTab} centered sx={{ mb: 4 }}>
      <Tab label="Entrada" component={Link} to="/" />
      <Tab label="Salida" component={Link} to="/salida" />
      <Tab label="Admin" component={Link} to="/admin" />
    </Tabs>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EmployeeProvider>
        <BrowserRouter>
          <Container maxWidth="sm" sx={{ mt: 5, p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
            <Box textAlign="center" mb={2}>
              <Typography variant="h4" component="h1" gutterBottom>Assistance System</Typography>
              <Typography variant="body1" color="textSecondary">Control de Ingreso y Salida</Typography>
            </Box>

            <Navigation />

            <Routes>
              <Route path="/" element={<Ingreso />} />
              <Route path="/salida" element={<Salida />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </EmployeeProvider>
    </ThemeProvider>
  );
}

export default App;
