import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const TopAppBar: React.FC = () => {

    const navigate = useNavigate();

    const goToInventory = () => {
        navigate('/');
    };


    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const handleLogin = () => {
        //TODO: auth
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className='bg-dark'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={goToInventory} style={{ cursor: 'pointer' }}>
                        Inventory
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={goToDashboard} style={{ cursor: 'pointer' }}>
                        Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopAppBar;