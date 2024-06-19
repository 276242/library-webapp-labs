import './Book-form.css';
import { List, ListItem, ListItemText } from '@mui/material';

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  availableCopies: number;
}

const books: Book[] = [
  // {
  //   id: 1,
  //   title: 'Book 1',
  //   author: 'Author 1',
  //   isbn: '123456789',
  //   publisher: 'ABC Publisher',
  //   publicationYear: 2002,
  //   availableCopies: 5,
  // },
  // {
  //   id: 2,
  //   title: 'Book 2',
  //   author: 'Author 2',
  //   isbn: '987654321',
  //   publisher: 'XYZ Publisher',
  //   publicationYear: 2005,
  //   availableCopies: 0,
  // },
];

function BookList() {
  return (
    <List>
      {books.map((book) => (
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
                <div
                  className={`book-detail ${book.availableCopies > 0 ? '' : 'not-available'}`}
                >
                  Available Copies:{' '}
                  {book.availableCopies > 0
                    ? book.availableCopies
                    : 'Not available'}
                </div>
              </div>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default BookList;
