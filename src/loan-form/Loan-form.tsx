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
    <Box>
      <Typography variant="h2">{t('Loans')}</Typography>

      <List>
        {loans.map((loan) => (
          <ListItem key={loan.id}>
            <ListItemText
              primary={`${t('bookTitle')}: ${loan.book.title}`}
              secondary={`${t('user')}: ${loan.user.name} ${loan.user.lastName}, ${t('loanDate')}: ${formatDate(loan.loanDate)}, ${t('dueDate')}: ${formatDate(loan.dueDate)}`}
            />
            <Button onClick={() => onDelete(loan.id)}>{t('Delete')}</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default LoanList;
