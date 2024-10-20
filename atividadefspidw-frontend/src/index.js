import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from './Componentes/Navbar';
import Eventos from './Paginas/Eventos/Eventos';
import Despesas from './Paginas/Despesas/Despesas';
import Doadores from './Paginas/Doadores/Doadores';
import Membros from './Paginas/Membros/Membros';
import MembroCadastro from './Paginas/Membros/MembroCadastro';
import Login from './Paginas/Login/Login';  
import PrivateRoute from './Componentes/PrivateRoute';
import EsqueciSenha from './Componentes/EsqueciSenha';
import TrocarSenha from './Componentes/TrocarSenha';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/esqueci-senha',
    element: <EsqueciSenha />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Navbar />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/eventos',
        element: <Eventos />
      },
      {
        path: '/despesas',
        element: <Despesas />
      },
      {
        path: '/membros',
        element: <Membros />
      },
      {
        path: '/membros/:idMembro',
        element: <MembroCadastro />
      },
      {
        path: '/membros/novo',
        element: <MembroCadastro />
      },
      {
        path: '/configuracoes/trocar-senha', // Nova rota
        element: <TrocarSenha />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
