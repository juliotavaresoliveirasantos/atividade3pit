import React, { useState } from 'react';
import axios from 'axios';

const Registrar = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('funcionario');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleRegistro = async (event) => {
    event.preventDefault();

    try {
      // Faz uma requisição POST para a rota de registro do backend
      const response = await axios.post('http://localhost:3001/api/registrar', {
        nome,
        email,
        senha,
        nivel_acesso: nivelAcesso
      });

      // Exibe a mensagem de sucesso
      setMensagem(response.data.message);
      setErro('');
    } catch (error) {
      // Exibe uma mensagem de erro caso ocorra algum problema
      setErro('Erro ao registrar o usuário. Verifique os dados ou tente novamente.');
      setMensagem('');
    }
  };

  return (
    <div>
      <h2>Registrar Novo Usuário</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <select value={nivelAcesso} onChange={(e) => setNivelAcesso(e.target.value)}>
          <option value="funcionario">Funcionário</option>
          <option value="administrador">Administrador</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
};

export default Registrar;
