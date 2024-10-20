import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrocarSenha = () => {
  const [senhaAtual, setSenhaAtual] = useState(''); // Novo estado para a senha atual
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleTrocarSenha = async (e) => {
    e.preventDefault();
    
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não correspondem.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3001/api/trocar-senha', {
        senhaAtual, // Enviando a senha atual
        novaSenha // Enviando a nova senha
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMensagem('Senha alterada com sucesso.');
      setErro('');
      setTimeout(() => {
        navigate('/'); // Redireciona após 2 segundos
      }, 2000);
    } catch (error) {
      setErro('Erro ao alterar a senha. Tente novamente.');
      setMensagem('');
    }
  };

  return (
    <div className="trocar-senha-container">
      <h2>Trocar Senha</h2>
      <form onSubmit={handleTrocarSenha}>
        <div className="form-group">
          <label>Senha Atual</label>
          <input 
            type="password" 
            value={senhaAtual} 
            onChange={(e) => setSenhaAtual(e.target.value)} 
            className="form-control" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Nova Senha</label>
          <input 
            type="password" 
            value={novaSenha} 
            onChange={(e) => setNovaSenha(e.target.value)} 
            className="form-control" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Confirmar Nova Senha</label>
          <input 
            type="password" 
            value={confirmarSenha} 
            onChange={(e) => setConfirmarSenha(e.target.value)} 
            className="form-control" 
            required 
          />
        </div>
        {erro && <p className="text-danger">{erro}</p>}
        {mensagem && <p className="text-success">{mensagem}</p>}
        <button type="submit" className="btn btn-primary">Alterar Senha</button>
      </form>
    </div>
  );
};

export default TrocarSenha;
