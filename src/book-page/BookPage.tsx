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
import { GetLoanResponseDto } from '../api/dto/get-loans-response.dto';
import LoanList from '../loan-form/Loan-form';
import AddLoanForm from '../loan-form/AddLoan-form';
import { CreateLoanDto } from '../api/dto/create-loan.dto';
import { LibraryClient } from '../api/library-client';

export default function BookPage() {
  const { t } = useTranslation();
  const apiClient = useApi();
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const [books, setBooks] = useState<any>([]);
  const [isAddBookFormVisible, setIsAddBookFormVisible] = useState(false);
  const [client, setClient] = useState(new LibraryClient());

  useEffect(() => {
    apiClient.getBooks().then((response) => {
      console.log(response);
      if (response.success) {
        setBooks(response.data!);
      }
    });
    fetchBooks();
  }, [apiClient]);

  const handleAddBook = (book: BookFormValues) => {
    setBooks((prevBooks: any) => [...prevBooks, book]);
    setIsAddBookFormVisible(false);
  };

  const handleAddBookClick = () => {
    setIsAddBookFormVisible(!isAddBookFormVisible);
  };

  const handleDeleteBook = (id: number) => {
    apiClient.deleteBook(id).then((response) => {
      if (response.success) {
        setBooks((prevBooks: any) =>
          prevBooks.filter((book: any) => book.id !== id),
        );
      }
    });
  };

  const fetchBooks = () => {
    apiClient.getBooks().then((response) => {
      if (response.success) {
        setBooks(response.data!);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: 'black', color: 'white', m: 1 }} // Set background color to black and text color to white
            onClick={handleAddBookClick}
            startIcon={<AddIcon />}
          >
            {t('addBook')}
          </Button>
        </Box>
        {isAddBookFormVisible && <AddBookForm onAddBook={handleAddBook} />}
      </Box>
      <BookList books={books} onDelete={handleDeleteBook} />
      <Outlet />
    </Box>
  );
}
