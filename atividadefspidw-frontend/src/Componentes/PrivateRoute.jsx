import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Checa se o token está presente no localStorage

  // Se não houver token, redireciona para a página de login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
