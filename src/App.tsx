import React from 'react';
import LoginForm from './login-form/Login-form';
import BookList from './book-form/Book-form';
import HomePage from './home-page/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  return (
    // <HomePage />
    // <BookList />
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<HomePage />}>
        <Route
          path="books"
          element={
            <div
              // style={{ height: 300, width: '100%', backgroundColor: 'beige' }}
            >
              <BookList />
            </div>
          }
        />
        <Route
          path="loans"
          element={
            <div
              // style={{ height: 300, width: '100%', backgroundColor: 'brown' }}
            />
          }
        />
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
