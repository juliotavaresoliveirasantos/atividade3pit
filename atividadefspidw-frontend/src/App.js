import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {
  const [nomeUsuario, setNomeUsuario] = useState('');

  // Obtém o nome do usuário do localStorage ao montar o componente
  useEffect(() => {
    const nome = localStorage.getItem('nomeUsuario');
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  return (
    <div className="App">
      <h1>Olá, {nomeUsuario || 'administrador'}.</h1> {/* Exibe o nome do usuário ou "administrador" caso não esteja disponível */}
      <br></br>
      <h2>Seja bem-vindo ao sistema para gerenciar sua igreja.</h2>
    </div>
  );
}

export default App;
