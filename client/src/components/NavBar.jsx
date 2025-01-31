import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AccountMenu from './AccountMenu';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


export default function NavBar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar>
        <AccountMenu color={theme.palette.primary.main} />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button
            sx={{
              color: theme.palette.primary.main,
              fontFamily: 'Rubik, sans-serif',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'transparent',
                borderBottom: `2px solid ${theme.palette.primary.main}`
              }
            }}
          >
            צור קשר
          </Button>
          <Button
            sx={{
              color: theme.palette.primary.main,
              fontFamily: 'Rubik, sans-serif',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'transparent',
                borderBottom: `2px solid ${theme.palette.primary.main}`
              }
            }}
            component={Link}
            to="/about"
          >
            אודות
          </Button>
          <Button
            onMouseEnter={handleMouseEnter}
            sx={{
              color: theme.palette.primary.main,
              fontFamily: 'Rubik, sans-serif',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'transparent',
                borderBottom: `2px solid ${theme.palette.primary.main}`
              }
            }}
            component={Link}
            to="/products"
          >
            מוצרים
          </Button>
          <Button
            sx={{
              color: theme.palette.primary.main,
              fontFamily: 'Rubik, sans-serif',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'transparent',
                borderBottom: `2px solid ${theme.palette.primary.main}`
              }
            }}
            component={Link}
            to="/"
          >
            בית
          </Button>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 500
            }}
          >
            SCROLLS
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
