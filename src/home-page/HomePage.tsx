import { Box, Button } from '@mui/material';
import { MenuAppBar } from '../menu-app-bar/MenuAppBar';
import { Link, Outlet, Routes, Route } from 'react-router-dom';
import { useApi } from '../api/ApiProvide';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();
  const apiClient = useApi();

  apiClient.getBooks().then((response) => console.log(response));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" component={Link} to="books" sx={{ m: 1 }}>
          {t('books')}
        </Button>
        <Button variant="contained" component={Link} to="loans" sx={{ m: 1 }}>
          {t('loans')}
        </Button>
      </Box>
      <Outlet />
    </Box>
  );
}
