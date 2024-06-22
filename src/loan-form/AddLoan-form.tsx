// // AddLoanForm.tsx

// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import { GetBookDto } from '../api/dto/get-book.dto';
// import { CreateLoanDto } from '../api/dto/create-loan.dto';
// import { GetLoanResponseDto } from '../api/dto/get-loans-response.dto';

// interface AddLoanFormProps {
//   books: GetBookDto[];
//   onSubmit: (loan: CreateLoanDto) => void;
// }

// function AddLoanForm({ books, onSubmit }: AddLoanFormProps) {
//   const { t } = useTranslation();
//   const [selectedBookId, setSelectedBookId] = useState<number>(0);
//   const [loanDate, setLoanDate] = useState<string>('');
//   const [dueDate, setDueDate] = useState<string>('');

//   const handleLoanSubmit = () => {
//     if (!selectedBookId || !loanDate || !dueDate) {
//       alert('Please fill in all fields');
//       return;
//     }

//     const newLoan: CreateLoanDto = {
//       userId: Number(localStorage.getItem('userId')),
//       bookId: selectedBookId,
//       loanDate: new Date(loanDate).toISOString(),
//       dueDate: new Date(dueDate).toISOString(),
//     };

//     onSubmit(newLoan);

//     setSelectedBookId(0);
//     setLoanDate('');
//     setDueDate('');
//   };

//   return (
//     <Box>
//       <Typography variant="h2">{t('addLoan')}</Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <Select
//           value={selectedBookId}
//           onChange={(e) => setSelectedBookId(e.target.value as number)}
//           variant="outlined"
//           fullWidth
//           sx={{ mb: 2 }}
//         >
//           <MenuItem value={0} disabled>
//             {t('selectBook')}
//           </MenuItem>
//           {books.map((book) => (
//             <MenuItem key={book.id} value={book.id}>
//               {book.title}
//             </MenuItem>
//           ))}
//         </Select>
//         <TextField
//           type="date"
//           label={t('loanDate')}
//           value={loanDate}
//           onChange={(e) => setLoanDate(e.target.value)}
//           variant="outlined"
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           type="date"
//           label={t('dueDate')}
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           variant="outlined"
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <Button onClick={handleLoanSubmit} variant="contained" color="primary">
//           {t('submit')}
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default AddLoanForm;
import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GetBookDto } from '../api/dto/get-book.dto';
import { CreateLoanDto } from '../api/dto/create-loan.dto';

interface AddLoanFormProps {
  books: GetBookDto[];
  onSubmit: (loan: CreateLoanDto) => void;
}

function AddLoanForm({ books, onSubmit }: AddLoanFormProps) {
  const { t } = useTranslation();
  const [selectedBookId, setSelectedBookId] = useState<number>(0);
  const [loanDate, setLoanDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const handleLoanSubmit = () => {
    if (!selectedBookId || !loanDate || !dueDate) {
      alert('Please fill in all fields');
      return;
    }

    const newLoan: CreateLoanDto = {
      userId: Number(localStorage.getItem('userId')),
      bookId: selectedBookId,
      loanDate: new Date(loanDate).toISOString(),
      dueDate: new Date(dueDate).toISOString(),
    };

    onSubmit(newLoan);

    setSelectedBookId(0);
    setLoanDate('');
    setDueDate('');
  };

  return (
    <Box>
      <Typography variant="h4">{t('addLoan')}</Typography>
      <br />
      <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value as number)}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value={0} disabled>
            {t('selectBook')}
          </MenuItem>
          {books.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.title}
            </MenuItem>
          ))}
        </Select>
        <TextField
          type="date"
          label={t('loanDate')}
          value={loanDate}
          onChange={(e) => setLoanDate(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          type="date"
          label={t('dueDate')}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          onClick={handleLoanSubmit}
          variant="contained"
          sx={{ bgcolor: 'black', color: 'white' }}
        >
          {t('submit')}
        </Button>
      </Box>
      </div>
    </Box>
  );
}

export default AddLoanForm;
