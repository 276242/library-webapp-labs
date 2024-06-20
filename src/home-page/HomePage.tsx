import { Box, Button, IconButton, TextField } from '@mui/material';
import { MenuAppBar } from '../menu-app-bar/MenuAppBar';
import { Link, Outlet, Routes, Route } from 'react-router-dom';
import { useApi } from '../api/ApiProvide';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import BookList from '../book-form/Book-form';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddBookForm from '../book-form/AddBook-form';
import type { BookFormValues } from '../book-form/AddBook-form';

export default function HomePage() {
  const { t } = useTranslation();
  const apiClient = useApi();

  // const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<any>([]);
  const [isAddBookFormVisible, setIsAddBookFormVisible] = useState(false);

  useEffect(() => {
    apiClient.getBooks().then((response) => {
      console.log(response);
      if (response.success) {
        setBooks(response.data!);
      }
    });
  }, [apiClient]);

  const handleAddBook = (book: BookFormValues) => {
    setBooks((prevBooks: any) => [...prevBooks, book]);
    setIsAddBookFormVisible(false); // Hide the form after adding the book
  };

  const handleAddBookClick = () => {
    setIsAddBookFormVisible(!isAddBookFormVisible);
  };

  // const handleSearch = () => {
  //   apiClient
  //     .getBooks(searchTerm)
  //     .then((response) => {
  //       if (response.success) {
  //         setBooks(response.data!);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleDeleteBook = (id: number) => {
    apiClient.deleteBook(id).then((response) => {
      if (response.success) {
        setBooks((prevBooks: any) =>
          prevBooks.filter((book: any) => book.id !== id),
        );
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          m: 2,
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
          <TextField
            placeholder={t('search')}
            variant="outlined"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '40%' }}
          />
          <Button variant="contained" sx={{ m: 1 }}>
            {t('search')}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
          <Button variant="contained" component={Link} to="books" sx={{ m: 1 }}>
            {t('books')}
          </Button>
          <Button variant="contained" component={Link} to="loans" sx={{ m: 1 }}>
            {t('loans')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBookClick}
            startIcon={<AddIcon />}
            sx={{ m: 1 }}
          >
            {t('addBook')}
          </Button>
          {/* <IconButton
            size="large"
            color="inherit"
            aria-label="add book"
            onClick={handleAddBookClick}
            sx={{ m: 1 }}
          >
            <AddIcon />
          </IconButton> */}
        </Box>
        {isAddBookFormVisible && <AddBookForm onAddBook={handleAddBook} />}
      </Box>
      <Routes>
        <Route
          path="books"
          element={<BookList books={books} onDelete={handleDeleteBook} />}
        />
      </Routes>
      <Outlet />
    </Box>
  );
}
