import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AccountMenu({ user = { name: 'אורח', email: '' } }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const firstLetter = user?.name ? user.name.charAt(0) : 'א';

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Tooltip title={user?.name || 'אורח'}>
        <IconButton onClick={handleClick}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>{firstLetter}</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '300px',
            padding: '16px',
            '& .MuiMenuItem-root': {
              direction: 'rtl',
              fontFamily: 'Rubik, sans-serif'
            }
          }
        }}
      >
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Avatar sx={{ width: 60, height: 60, margin: '0 auto', bgcolor: 'primary.main' }}>
            {firstLetter}
          </Avatar>
          <Typography variant="h6" sx={{ mt: 1, fontFamily: 'Rubik, sans-serif' }}>
            {user?.name || 'אורח'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>

        <MenuItem onClick={handleClose} dir="rtl">
          <ListItemIcon sx={{ marginLeft: 1 }}>
            <AccountCircleIcon />
          </ListItemIcon>
          החשבון שלי
        </MenuItem>

        <MenuItem onClick={handleClose} dir="rtl">
          <ListItemIcon sx={{ marginLeft: 1 }}>
            <LogoutIcon />
          </ListItemIcon>
          התנתק
        </MenuItem>
      </Menu>
    </Box>
  );
}
