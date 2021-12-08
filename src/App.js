import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout';
import 'tailwindcss/tailwind.css';
import './App.css';
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from './routes/routes';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './pages/ErrorPage';

const theme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#2E4DA7",
                    fontFamily: "Inter",
                }
            }
        },
    },

    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

function App() {
    return (
        <StyledEngineProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        {PUBLIC_ROUTE.map((val) => (
                            <PublicRoute 
                                key={val.name}
                                path={val.path}
                                exact={val.exact}
                                component={val.component}
                                restricted={val.restricted}
                            />
                        ))}
                        <Route>
                            <Layout>
                                <Switch>
                                    {PRIVATE_ROUTE.map((val) => (
                                        <PrivateRoute 
                                            key={val.name}
                                            path={val.path}
                                            exact={val.exact}
                                            component={val.component}
                                            private={val.private}
                                        />
                                    ))}
                                </Switch>
                            </Layout>
                        </Route>
                        <Route path="/" render={() => (
                            <Redirect to="/" />
                        )} />
                        <Route component={ErrorPage} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;