import './Book-form.css';
import { List, ListItem, ListItemText } from '@mui/material';

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  available: boolean;
  //availableCopies: number;
}

interface BookListProps {
  books: Book[];
}

function BookList({ books }: BookListProps) {
  return (
    <List>
      {books.map((book) => (
        <ListItem key={book.id} className="book-container">
          <ListItemText
            primary={book.title}
            className="book-title"
            secondary={
              <div className="book-details">
                <div className="book-detail">Author: {book.author}</div>
                <div className="book-detail">ISBN: {book.isbn}</div>
                <div className="book-detail">Publisher: {book.publisher}</div>
                <div className="book-detail">
                  Publication Year: {book.publicationYear}
                </div>
                <div className="book-detail">
                  Available: {book.available ? 'Yes' : 'No'}
                </div>
                {/* <div
                  className={`book-detail ${book.availableCopies > 0 ? '' : 'not-available'}`}
                >
                  Available Copies:{' '}
                  {book.availableCopies > 0
                    ? book.availableCopies
                    : 'Not available'}
                </div> */}
              </div>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default BookList;
