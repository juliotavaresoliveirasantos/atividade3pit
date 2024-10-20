const API_BASE_URL = 'http://localhost:3001/api';

class MembroService {
  // Método para obter todos os membros ou filtrar por nome
  async obterTodos(termoBusca = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/membro?nome=${termoBusca}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao listar os membros.');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar os membros:', error);
      throw error;
    }
  }

  // Método para obter membro por ID
  async obterPorId(idMembro) {
    try {
      const response = await fetch(`${API_BASE_URL}/membro/${idMembro}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar o membro.');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar o membro:', error);
      throw error;
    }
  }

  // Método para adicionar ou atualizar um membro
  async salvar(membroDados, idMembro = null) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/membro${idMembro ? `/${idMembro}` : ''}`,
        {
          method: idMembro ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(membroDados)
        }
      );
      if (!response.ok) {
        throw new Error('Erro ao salvar o membro.');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar o membro:', error);
      throw error;
    }
  }

  // Método para excluir um membro pelo ID
  async delete(idMembro) {
    try {
      const response = await fetch(`${API_BASE_URL}/membro/${idMembro}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar o membro.');
      }
    } catch (error) {
      console.error('Erro ao deletar o membro:', error);
      throw error;
    }
  }
}

export default MembroService;