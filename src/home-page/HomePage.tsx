import { Box, Button } from '@mui/material';
import { MenuAppBar } from '../menu-app-bar/MenuAppBar';
import { Link, Outlet, Routes, Route } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" component={Link} to="books" sx={{ m: 1 }}>
          Books
        </Button>
        <Button variant="contained" component={Link} to="loans" sx={{ m: 1 }}>
          Loans
        </Button>
      </Box>
      <Outlet />
    </Box>
  );
}
