import React from 'react';
import LoginForm from './login-form/Login-form';
import BookList from './book-form/Book-form';
import HomePage from './home-page/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import ApiProvider from './api/ApiProvide';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ApiProvider>
        <Routes>
          <Route path="/home" element={<HomePage />}>
            <Route
              path="books"
              // element={
              //   <div
              //     style={{
              //       height: 800,
              //       width: '100%',
              //       backgroundColor: 'bisque',
              //     }}
              //   ></div>
              // }
            />
            <Route
              path="loans"
              element={
                <div
                  style={{
                    height: 800,
                    width: '100%',
                    backgroundColor: 'burlywood',
                  }}
                />
              }
            />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </ApiProvider>
    </I18nextProvider>
  );
}

export default App;
