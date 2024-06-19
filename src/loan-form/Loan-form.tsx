import './Loan-form.css';
import { List, ListItem, ListItemText } from '@mui/material';

interface Loan {
  id: number;
  loanDate: Date;
  dueDate: Date;
  returnDate: Date;
}

const loans: Loan[] = [
  {
    id: 1,
    loanDate: new Date('2021-10-01'),
    dueDate: new Date('2021-10-15'),
    returnDate: new Date('2021-10-15'),
  },
  {
    id: 2,
    loanDate: new Date('2021-10-02'),
    dueDate: new Date('2021-10-16'),
    returnDate: new Date('2021-10-16'),
  },
];

function LoanList() {
  return (
    <List>
      {loans.map((loan) => (
        // <ListItem key={book.id} className="book-item">
        //   <ListItemText
        //     primary={book.title}
        //     secondary={
        //       <div>
        //         <div>Author: {book.author}</div>
        //         <div>ISBN: {book.isbn}</div>
        //         <div>Publisher: {book.publisher}</div>
        //         <div>Publication Year: {book.publicationYear}</div>
        //         <div>
        //           Available Copies:{' '}
        //           {book.availableCopies > 0
        //             ? book.availableCopies
        //             : 'Not available'}
        //         </div>
        //       </div>
        //     }
        //   />
        // </ListItem>

        <ListItem key={loan.id} className="loan-container">
          <ListItemText
            primary={loan.id}
            secondary={
              <div>
                <div>Loan Date: {loan.loanDate.toDateString()}</div>
                <div>Due Date: {loan.dueDate.toDateString()}</div>
                <div>Return Date: {loan.returnDate.toDateString()}</div>
              </div>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default LoanList;
