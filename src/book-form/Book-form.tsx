import './Book-form.css';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { t } from 'i18next';

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  available: boolean;
}

interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
}

function BookList({ books, onDelete }: BookListProps) {
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="book-card" variant="outlined">
            <CardMedia
              component="img"
              height="140"
              // image={book.image}
              alt={book.title}
            />
            <CardContent>
              <div style={{ position: 'relative' }}>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('author')}: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('isbn')}: {book.isbn}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('publisher')}: {book.publisher}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('publicationYear')}: {book.publicationYear}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('available')}: {book.available ? t('Yes') : t('No')}
                </Typography>
                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    // disabled={!book.available}
                    onClick={() => onDelete(book.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BookList;
