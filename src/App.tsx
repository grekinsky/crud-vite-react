import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  useParams,
  Routes,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CoffeeIcon from '@mui/icons-material/Coffee';
import store from './store';
import CoffeeList from './components/CoffeeList';
import ModifyCoffeeForm from './components/ModifyCoffeeForm';
import AddCoffeeForm from './components/AddCoffeeForm';
import { AppBar, Box, Container, Link, Stack, Toolbar, Typography } from '@mui/material';

const ModifyCoffeeFormScreen = () => {
  const { coffeeId } = useParams<{ coffeeId: string }>();
  const parsedcoffeeId = parseInt(coffeeId ?? '0', 10);
  return <ModifyCoffeeForm id={parsedcoffeeId} />;
};

const defaultTheme = createTheme();

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <Router>
      <Provider store={store}>
        <AppBar component="nav" position="relative">
          <Container maxWidth="lg">
            <Toolbar>
              <CoffeeIcon sx={{ mr: 2 }} />
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Coffee Recipes
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Stack direction="row" spacing={2}>
                  <Link component={RouterLink} to="/" sx={{ color: '#fff' }}>
                    Coffee List
                  </Link>
                  <Link component={RouterLink} to="/add" sx={{ color: '#fff' }}>
                    Add a Coffee
                  </Link>
                </Stack>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <main>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Routes>
              <Route path="/add" element={<AddCoffeeForm />} />
              <Route path="/modify/:coffeeId" element={<ModifyCoffeeFormScreen />} />
              <Route path="/" element={<CoffeeList />} />
            </Routes>
          </Container>
        </main>
      </Provider>
    </Router>
  </ThemeProvider>
);

export default App;
