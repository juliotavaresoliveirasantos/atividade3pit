import React, { useState } from 'react';
import axios from 'axios';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleRecuperacaoSenha = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/esqueci-senha', { email });
      setMensagem('Email de recuperação enviado, verifique sua caixa de entrada.');
      setErro('');
    } catch (error) {
      setErro('Erro ao enviar email de recuperação. Verifique se o email está correto.');
      setMensagem('');
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-white">Esqueci Minha Senha</h2>
      <form onSubmit={handleRecuperacaoSenha} className="login-form">
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="form-control my-3"
            required
          />
        </div>
        <button type="submit" className="btn btn-light btn-block">Enviar Email de Recuperação</button>
        {mensagem && <p className="text-success mt-3">{mensagem}</p>}
        {erro && <p className="text-danger mt-3">{erro}</p>}
      </form>
    </div>
  );
};

export default EsqueciSenha;
