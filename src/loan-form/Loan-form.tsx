import { t } from 'i18next';
import './Loan-form.css';
import { GetLoanResponseDto } from '../api/dto/get-loans-response.dto';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

interface LoanListProps {
  loans: GetLoanResponseDto[];
  onDelete: (id: number) => void;
}

function LoanList({ loans, onDelete }: LoanListProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  return (
    <Box >
      <Box display="flex" justifyContent="center">
        <Typography variant="h3">{t('loans')}</Typography>
      </Box>
      <br />
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">
          {t('user')}: {loans.length > 0 ? loans[0].user.name : ''}{' '}
          {loans.length > 0 ? loans[0].user.lastName : ''}
        </Typography>
      </Box>
      <br />
      <Box justifyContent="center" width={'50%'} >
      <List>
        {loans.map((loan) => (
          <ListItem key={loan.id}>
            <ListItemText
              primary={`${t('bookTitle')}: ${loan.book.title}`}
              secondary={
                <div className="loan-details">
                  <div className="loan-detail">
                    {t('loanDate')}: {formatDate(loan.loanDate)}
                  </div>
                  <div className="loan-detail">
                    {t('dueDate')}: {formatDate(loan.dueDate)}
                  </div>
                </div>
              }
            />
            <Button onClick={() => onDelete(loan.id)}>{t('delete')}</Button>
          </ListItem>
        ))}
      </List>
      </Box>
    </Box>
  );
}

export default LoanList;
