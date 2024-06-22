import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useState } from 'react';

export function MenuAppBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLanguage);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  //   return (
  //     <>
  //       <AppBar position="static">
  //         <Toolbar>
  //           <IconButton
  //             size="large"
  //             edge="start"
  //             color="inherit"
  //             aria-label="menu"
  //             sx={{ mr: 2 }}
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  //             {t('library')}
  //           </Typography>
  //           <Box>
  //             <IconButton
  //               size="large"
  //               color="inherit"
  //               aria-label="account"
  //               aria-controls="menu-appbar"
  //               aria-haspopup="true"
  //               onClick={() => navigate('/login')}
  //               sx={{ mr: 2 }}
  //               // component={Link}
  //               // to={'/login'}
  //             >
  //               <AccountCircle />
  //             </IconButton>

  //             <IconButton
  //               size="small"
  //               color="inherit"
  //               aria-label="toggle language"
  //               onClick={toggleLanguage}
  //             >
  //               {i18n.language === 'pl' ? 'EN' : 'PL'}
  //             </IconButton>
  //           </Box>
  //         </Toolbar>
  //       </AppBar>
  //       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
  //         <Box
  //           sx={{ width: 250 }}
  //           role="presentation"
  //           onClick={handleDrawerToggle}
  //           onKeyDown={handleDrawerToggle}
  //         >
  //           <List>
  //             <ListItem button onClick={() => handleNavigation('/')}>
  //               <ListItemText primary={t('home')} />
  //             </ListItem>
  //             <ListItem button onClick={() => handleNavigation('/books')}>
  //               <ListItemText primary={t('books')} />
  //             </ListItem>
  //             <ListItem button onClick={() => handleNavigation('/loans')}>
  //               <ListItemText primary={t('loans')} />
  //             </ListItem>
  //           </List>
  //         </Box>
  //       </Drawer>
  //     </>
  //   );
  // }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: 'white' }}
            onClick={handleDrawerToggle} // Toggle drawer on MenuIcon click
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ flexGrow: 1, color: 'white' }}
          >
            {t('library')}
          </Typography>
          <Box>
            <IconButton
              size="large"
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => navigate('/login')}
              sx={{ mr: 2, color: 'white' }}
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              aria-label="toggle language"
              onClick={toggleLanguage}
              sx={{ color: 'white' }}
            >
              {i18n.language === 'pl' ? 'EN' : 'PL'}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)} // Close drawer on backdrop click
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)} // Close drawer on item click
          onKeyDown={() => setDrawerOpen(false)} // Close drawer on ESC key press
        >
          <List>
            <ListItem button onClick={() => handleNavigation('/home')}>
              <ListItemText primary={t('home')} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/books')}>
              <ListItemText primary={t('books')} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/loans')}>
              <ListItemText primary={t('loans')} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default MenuAppBar;
