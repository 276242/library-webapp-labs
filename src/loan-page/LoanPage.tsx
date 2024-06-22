import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvide';
import { useEffect, useState } from 'react';
import { LibraryClient } from '../api/library-client';
import { GetLoanResponseDto } from '../api/dto/get-loans-response.dto';
import { CreateLoanDto } from '../api/dto/create-loan.dto';
import { Box, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/MenuAppBar';
import LoanList from '../loan-form/Loan-form';
import AddLoanForm from '../loan-form/AddLoan-form';
import AddIcon from '@mui/icons-material/Add';
import { Outlet } from 'react-router-dom';

export default function LoanPage() {
  const { t } = useTranslation();
  const apiClient = useApi();
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const [books, setBooks] = useState<any>([]);
  const [loans, setLoans] = useState<GetLoanResponseDto[]>([]);
  const [isAddLoanFormVisible, setIsAddLoanFormVisible] = useState(false);
  const [client, setClient] = useState(new LibraryClient());

  const fetchBooks = () => {
    apiClient.getBooks().then((response) => {
      if (response.success) {
        setBooks(response.data!);
      }
    });
  };

  useEffect(() => {
    apiClient
      .getLoansByUserId()
      .then((response) => {
        if (response.success) {
          setLoans(response.data!);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    fetchLoans();
  }, [apiClient, userId]);

  const handleAddLoan = (loan: CreateLoanDto) => {
    client.createLoan(loan).then((response) => {
      if (response.success && response.data) {
        const newLoan: GetLoanResponseDto = {
          id: response.data.id,
          loanDate: Date.parse(response.data.loanDate),
          dueDate: Date.parse(response.data.dueDate),
          user: response.data.user, 
          book: response.data.book,
        };
        setLoans([...loans, newLoan]);
        setIsAddLoanFormVisible(false);
      }
    });
  };

  const handleAddLoanClick = () => {
    setIsAddLoanFormVisible(!isAddLoanFormVisible);
  };

  const handleDeleteLoan = (id: number) => {
    client.deleteLoan(id).then((response) => {
      if (response.success) {
        setLoans(loans.filter((loan) => loan.id !== id));
      }
    });
  };

  const fetchLoans = () => {
    client.getLoansByUserId().then((response) => {
      if (response.success) {
        setLoans(response.data!);
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
            color="primary"
            onClick={handleAddLoanClick}
            startIcon={<AddIcon />}
            sx={{ bgcolor: 'black', color: 'white' , m: 1}} >
            {t('addLoan')}
          </Button>
        </Box>
        {isAddLoanFormVisible && (
          <AddLoanForm books={books} onSubmit={handleAddLoan} />
        )}{' '}
      </Box>
      <LoanList loans={loans} onDelete={handleDeleteLoan} />
      <Outlet />
    </Box>
  );
}
