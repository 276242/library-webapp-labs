import { Box, Button, TextField } from '@mui/material';
// import addbookform css
import '../book-form/AddBook-form.css';
import AddIcon from '@mui/icons-material/Add';
import { Formik, FormikHelpers } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useApi } from '../api/ApiProvide';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { Book } from '@mui/icons-material';

interface AddBookFormProps {
  onAddBook: (newBook: BookFormValues) => void;
}

export interface BookFormValues {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  availableCopies: number;
}

function AddBookForm({ onAddBook }: AddBookFormProps) {
  const initialValues: BookFormValues = {
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publicationYear: 0,
    availableCopies: 0,
  };

  // const navigate = useNavigate();
  const apiClient = useApi();

  const submit = (
    values: BookFormValues,
    { setSubmitting }: FormikHelpers<BookFormValues>,
  ) => {
    apiClient
      .createBook(values)
      .then((response) => {
        if (response.success && response.data) {
          const newBook: BookFormValues = {
            isbn: response.data.isbn ?? '',
            title: response.data.title ?? '',
            author: response.data.author ?? '',
            publisher: response.data.publisher ?? '',
            publicationYear: response.data.publicationYear || 0,
            availableCopies: response.data.availableCopies ?? 0,
          };
          onAddBook(response.data);
        }
      })
      .finally(() => setSubmitting(false));
  };

  const validationSchema = useMemo(
    () =>
      yup.object({
        isbn: yup.string().required(t('isbnError')),
        title: yup.string().required(t('titleError')),
        author: yup.string().required(t('authorError')),
        publisher: yup.string().required(t('publisherError')),
        publicationYear: yup
          .number()
          .nullable()
          .min(0, t('publicationYearError')),
        availableCopies: yup
          .number()
          .nullable()
          .min(1, t('availableCopiesError')),
      }),
    [],
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
      flexDirection="column"
    >
      {' '}
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
      >
        {(formik: any) => (
          <form
            id="addBookForm"
            className="AddBook-form"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <TextField
              id="title"
              label={t('title')}
              variant="standard"
              // name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              id="author"
              label={t('author')}
              variant="standard"
              // name="author"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />
            <TextField
              id="isbn"
              label={t('isbn')}
              variant="standard"
              // name="isbn"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.isbn && Boolean(formik.errors.isbn)}
              helperText={formik.touched.isbn && formik.errors.isbn}
            />
            <TextField
              id="publisher"
              label={t('publisher')}
              variant="standard"
              // name="publisher"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.publisher && Boolean(formik.errors.publisher)
              }
              helperText={formik.touched.publisher && formik.errors.publisher}
            />
            <TextField
              id="publicationYear"
              label={t('publicationYear')}
              variant="standard"
              type="number"
              // name="publicationYear"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.publicationYear &&
                Boolean(formik.errors.publicationYear)
              }
              helperText={
                formik.touched.publicationYear && formik.errors.publicationYear
              }
            />
            <TextField
              id="availableCopies"
              label={t('availableCopies')}
              variant="standard"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.availableCopies &&
                Boolean(formik.errors.availableCopies)
              }
              helperText={
                formik.touched.availableCopies && formik.errors.availableCopies
              }
            />
            <div>
              <Button
                variant="contained"
                type="submit"
                disabled={!formik.dirty}
                sx={{ bgcolor: 'black', color: 'white' }}

              >
                {t('confirm')}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default AddBookForm;
