import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendar, FaBars, FaMoneyBill, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa'; // Adiciona FaCog para ícone de configurações
import { Container, Dropdown } from 'react-bootstrap';
import './Navbar.css';
import { useState, useEffect } from 'react';

function Navbar() {
  const [show, setShow] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('');
  const [configOpen, setConfigOpen] = useState(false); // Controle de exibição do submenu
  const navigate = useNavigate(); // Hook para redirecionar

  const handleShow = () => {
    setShow(!show);
  };

  // Função de logout
  const handleLogout = () => {
    // Remover dados do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('nivelAcesso');
    // Redirecionar para a tela de login
    navigate('/login');
  };

  // Use useEffect para obter os valores do localStorage ao montar o componente
  useEffect(() => {
    setNomeUsuario(localStorage.getItem('nomeUsuario'));
    setNivelAcesso(localStorage.getItem('nivelAcesso'));
  }, []);

  // Função para abrir ou fechar o submenu de configurações
  const handleConfigClick = () => {
    setConfigOpen(!configOpen);
  };

  return (
    <>
      <div className={`side-navbar ${show ? 'active-nav' : ''}`} id="sidebar">
        <ul className="nav flex-column text-white w-100">
          <span className="nav-link h3 text-white my-2">
            {nomeUsuario ? `${nomeUsuario} (${nivelAcesso})` : 'Bem-vindo'}
          </span>
        </ul>
        <li className="nav-link">
          <Link to='/'>
            <FaHome />
            <span className="mx-2">Início</span>
          </Link>
        </li>
        <li className="nav-link">
          <Link to='/eventos'>
            <FaCalendar />
            <span className="mx-2">Eventos</span>
          </Link>
        </li>
        <li className="nav-link">
          <Link to='/despesas'>
            <FaMoneyBill />
            <span className="mx-2">Despesas</span>
          </Link>
        </li>
        <li className="nav-link">
          <Link to='/membros'>
            <FaUser />
            <span className="mx-2">Membros</span>
          </Link>
        </li>
        <li className="nav-link">
          <Link to='/doadores'>
            <FaMoneyBill />
            <span className="mx-2">Doadores</span>
          </Link>
        </li>

        {/* Engrenagem de Configurações */}
        <li className="nav-link">
          <button className="btn btn-link text-white" onClick={handleConfigClick}>
            <FaCog />
            <span className="mx-2">Configurações</span>
          </button>
          {/* Submenu para trocar senha */}
          {configOpen && (
            <ul className="submenu">
              <li className="nav-link">
                <Link to="/configuracoes/trocar-senha">Trocar Senha</Link>
              </li>
            </ul>
          )}
        </li>

        {/* O botão de logout agora usa o ícone FaSignOutAlt */}
        <li className="nav-link">
          <button className="btn btn-link text-white" onClick={handleLogout}>
            <FaSignOutAlt />
            <span className="mx-2">Logout</span>
          </button>
        </li>
      </div>

      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Navbar;
