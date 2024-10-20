import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importando o CSS atualizado

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, senha });
      const { token, usuario } = response.data;

      // Armazenar o token, nome do usuário e nível de acesso no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('nomeUsuario', usuario.nome);
      localStorage.setItem('nivelAcesso', usuario.nivel_acesso);

      // Redireciona após login
      navigate('/');
    } catch (error) {
      setErro('Credenciais inválidas.');
    }
  };

  return (
    <div className="login-container"> {/* Estilo centralizado */}
      <h2 className="text-white">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-control my-3"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="form-control my-3"
            required
          />
        </div>
        <button type="submit" className="btn btn-light btn-block">Entrar</button>
        {erro && <p className="text-danger mt-3">{erro}</p>}
      </form>
      <button className="btn btn-link mt-3 text-white" onClick={() => navigate('/esqueci-senha')}>
  Esqueci Minha Senha
</button>
    </div>
  );
};

export default Login;
