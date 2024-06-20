import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export function MenuAppBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            sx={{ mr: 2 }}
            // component={Link}
            // to={'/login'}
          >
            <AccountCircle />
          </IconButton>

          <IconButton
            size="small"
            color="inherit"
            aria-label="toggle language"
            onClick={toggleLanguage}
          >
            {i18n.language === 'pl' ? 'EN' : 'PL'}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
