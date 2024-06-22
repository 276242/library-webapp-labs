import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
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

export default function HomePage() {
  const { t } = useTranslation();
  const apiClient = useApi();
  const userId = localStorage.getItem('userId');
  console.log(userId);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'oldlace' }}>
      <MenuAppBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '20px',
        }}
      >
        <Typography variant="h4" align="center">
          {t('welcomeText')}
        </Typography>
        <Typography variant="body1" align="center">
          {t('welcomeText2')}
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: 'black', color: 'white' }}
          component={Link}
          to="/books"
        >
          {t('exploreBooks')}
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: 'black', color: 'white' }}
          component={Link}
          to="/loans"
        >
          {t('manageLoans')}
        </Button>
      </Box>
    </Box>
  );
}

// const [searchTerm, setSearchTerm] = useState('');
// const [books, setBooks] = useState<any>([]);
// const [loans, setLoans] = useState<GetLoanResponseDto[]>([]);
// const [isAddBookFormVisible, setIsAddBookFormVisible] = useState(false);
// const [isAddLoanFormVisible, setIsAddLoanFormVisible] = useState(false);
// const [client, setClient] = useState(new LibraryClient());

// useEffect(() => {
//   apiClient.getBooks().then((response) => {
//     console.log(response);
//     if (response.success) {
//       setBooks(response.data!);
//     }
//   });
//   fetchBooks();
//   fetchLoans();
// }, [apiClient]);

// useEffect(() => {
//   apiClient
//     .getLoansByUserId()
//     .then((response) => {
//       if (response.success) {
//         setLoans(response.data!);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   fetchBooks();
//   fetchLoans();
// }, [apiClient, userId]);

// const handleAddBook = (book: BookFormValues) => {
//   setBooks((prevBooks: any) => [...prevBooks, book]);
//   setIsAddBookFormVisible(false);
// };

// const handleAddLoan = (loan: CreateLoanDto) => {
//   client.createLoan(loan).then((response) => {
//     if (response.success && response.data) {
//       const newLoan: GetLoanResponseDto = {
//         id: response.data.id,
//         loanDate: Date.parse(response.data.loanDate),
//         dueDate: Date.parse(response.data.dueDate),
//         user: response.data.user, // Assuming user is correctly populated
//         book: response.data.book, // Assuming book is correctly populated
//       };
//       setLoans([...loans, newLoan]);
//       setIsAddLoanFormVisible(false);
//     }
//   });
// };

// const handleAddBookClick = () => {
//   setIsAddBookFormVisible(!isAddBookFormVisible);
// };

// const handleAddLoanClick = () => {
//   setIsAddLoanFormVisible(!isAddLoanFormVisible);
// };

// // const handleSearch = () => {
// //   apiClient
// //     .getBooks(searchTerm)
// //     .then((response) => {
// //       if (response.success) {
// //         setBooks(response.data!);
// //       }
// //     })
// //     .catch((error) => {
// //       console.log(error);
// //     });
// // };

// const handleDeleteBook = (id: number) => {
//   apiClient.deleteBook(id).then((response) => {
//     if (response.success) {
//       setBooks((prevBooks: any) =>
//         prevBooks.filter((book: any) => book.id !== id),
//       );
//     }
//   });
// };

// const handleDeleteLoan = (id: number) => {
//   client.deleteLoan(id).then((response) => {
//     if (response.success) {
//       setLoans(loans.filter((loan) => loan.id !== id));
//     }
//   });
// };

// const fetchBooks = () => {
//   apiClient.getBooks().then((response) => {
//     if (response.success) {
//       setBooks(response.data!);
//     }
//   });
// };

// const fetchLoans = () => {
//   client.getLoansByUserId().then((response) => {
//     if (response.success) {
//       setLoans(response.data!);
//     }
//   });
// };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <MenuAppBar />
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           m: 2,
//           flexDirection: 'column',
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
//           <TextField
//             placeholder={t('search')}
//             variant="outlined"
//             // value={searchTerm}
//             // onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ width: '40%' }}
//           />
//           <Button variant="contained" sx={{ m: 1 }}>
//             {t('search')}
//           </Button>
//         </Box>
//         <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
//           <Button variant="contained" component={Link} to="books" sx={{ m: 1 }}>
//             {t('books')}
//           </Button>
//           <Button variant="contained" component={Link} to="loans" sx={{ m: 1 }}>
//             {t('loans')}
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddBookClick}
//             startIcon={<AddIcon />}
//             sx={{ m: 1 }}
//           >
//             {t('addBook')}
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddLoanClick}
//             startIcon={<AddIcon />}
//             sx={{ m: 1 }}
//           >
//             {t('addLoan')}
//           </Button>
//           {/* <IconButton
//             size="large"
//             color="inherit"
//             aria-label="add book"
//             onClick={handleAddBookClick}
//             sx={{ m: 1 }}
//           >
//             <AddIcon />
//           </IconButton> */}
//         </Box>
//         {isAddBookFormVisible && <AddBookForm onAddBook={handleAddBook} />}
//         {isAddLoanFormVisible && (
//           <AddLoanForm books={books} onSubmit={handleAddLoan} />
//         )}
//       </Box>
//       <Routes>
//         <Route
//           path="books"
//           element={<BookList books={books} onDelete={handleDeleteBook} />}
//         />
//         <Route
//           path="loans"
//           element={<LoanList loans={loans} onDelete={handleDeleteLoan} />}
//         />
//       </Routes>
//       <Outlet />
//     </Box>
//   );
// }

// return (
//   <Box sx={{ flexGrow: 1 }}>
//     <MenuAppBar />
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         m: 2,
//         flexDirection: 'column',
//       }}
//     >
//       <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
//         <TextField
//           placeholder={t('search')}
//           variant="outlined"
//           // value={searchTerm}
//           // onChange={handleSearchChange}
//           sx={{ width: '40%' }}
//         />
//         <Button variant="contained" sx={{ m: 1 }}>
//           {t('search')}
//         </Button>
//       </Box>
//       <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddBookClick}
//           startIcon={<AddIcon />}
//           sx={{ m: 1 }}
//         >
//           {t('addBook')}
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddLoanClick}
//           startIcon={<AddIcon />}
//           sx={{ m: 1 }}
//         >
//           {t('addLoan')}
//         </Button>
//       </Box>
//       {isAddBookFormVisible && <AddBookForm onAddBook={handleAddBook} />}
//       {isAddLoanFormVisible && (
//         <AddLoanForm books={books} onSubmit={handleAddLoan} />
//       )}
//     </Box>
//     <Routes>
//       <Route
//         path="books"
//         element={<BookList books={books} onDelete={handleDeleteBook} />}
//       />
//       <Route
//         path="loans"
//         element={<LoanList loans={loans} onDelete={handleDeleteLoan} />}
//       />
//     </Routes>
//     <Outlet />
//   </Box>
// );
// }
