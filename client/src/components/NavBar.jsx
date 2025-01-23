import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountMenu from './AccountMenu';
import { useTheme } from '@mui/material/styles';

export default function NavBar({ user }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const productCategories = [
    'מגילות קלף',
    'ספרי תורה',
    'תפילין',
    'מזוזות'
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar>
        <AccountMenu user={user} color={theme.palette.primary.main} />
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
          >
            מוצרים
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ 
              onMouseLeave: handleClose,
              sx: { direction: 'rtl' }
            }}
            sx={{ 
              '& .MuiPaper-root': {
                marginTop: '8px',
                minWidth: '150px'
              }
            }}
          >
            {productCategories.map((category) => (
              <MenuItem 
                key={category}
                onClick={handleClose}
                sx={{ 
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '0.9rem',
                }}
              >
                {category}
              </MenuItem>
            ))}
          </Menu>

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
