"use client";

import { useState, useEffect } from 'react';
import styles from './usuario.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Adicionando axios para fazer a conexão com a API

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    user_nome: '',   // Nome do usuário
    user_email: '',  // Email
    user_tel: '',  // Telefone
    nivel_id: '',    // Nível de Acesso
    user_senha: '',       // Senha
  });
  const [error, setError] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false); // Novo estado para controlar o modo de edição
  const [editingUserId, setEditingUserId] = useState(null); // Estado para armazenar o ID do usuário que está sendo editado

  useEffect(() => {
    listarUsuarios();
  }, []);

  async function listarUsuarios() {
    try {
      const response = await axios.get('http://127.0.0.1:3333/usuarios');

      if (response.data.sucesso) {
        setUsuarios(response.data.dados);
      }
    } catch (error) {
      setError('Erro ao adicionar usuário');
      console.error(error);
    }
  }

  // Função para mapear o nível de acesso para um nome
  const getNivelAcessoLabel = (nivel_id) => {
    switch (nivel_id) {
      case 1:
        return 'ADMINISTRADOR';
      case 2:
        return 'USUARIO';
      case 3:
        return 'MOBILE';
      default:
        return 'DESCONHECIDO';
    }
  };

  // Atualiza os valores do novo usuário conforme o input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const updateUsuario = async () => {
    try {
      const response = await axios.patch(`http://10.67.23.19:3333/usuarios/${editingUserId}`, newUser);

      if (response.data.sucesso) {
        setShowModal(false);
        listarUsuarios(); // Atualiza a lista de usuários
        setNewUser({
          user_nome: '',
          user_email: '',
          user_tel: '',
          nivel_id: '',
          user_senha: '',
        });
        setIsEditMode(false); // Reseta o modo de edição
        setEditingUserId(null); // Reseta o ID do usuário sendo editado
      }
    } catch (error) {
      setError('Erro ao editar usuário');
      console.error(error);
    }
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setEditingUserId(user.user_id); // Armazena o ID do usuário que será editado
    setNewUser({
      user_nome: user.user_nome,
      user_email: user.user_email,
      user_tel: user.user_tel,
      nivel_id: user.nivel_id,
      user_senha: '', // Por segurança, você pode deixar a senha em branco
    });
    setShowModal(true);
  };

  // Adiciona um novo usuário e faz requisição para a API
  const addUsuario = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3333/usuarios', newUser);

      if (response.data.sucesso) {
        setShowModal(false);
        listarUsuarios();
        setNewUser({
          user_nome: '',
          user_email: '',
          user_tel: '',
          nivel_id: '',
          user_senha: '',
        });
      }
    } catch (error) {
      setError('Erro ao adicionar usuário');
      console.error(error);
    }
  };

  // Função para deletar o usuário no banco de dados e atualizar a lista local
  const deleteUsuario = async (userId, index) => {
    try {
      // Fazendo a requisição DELETE para a API
      const response = await axios.delete(`http://127.0.0.1:3333/usuarios/${userId}`);

      if (response.data.sucesso) {
        // Remover o usuário da lista local apenas se a deleção for bem-sucedida
        const updatedUsuarios = [...usuarios];
        updatedUsuarios.splice(index, 1);
        setUsuarios(updatedUsuarios);
      } else {
        setError('Erro ao deletar usuário');
      }
    } catch (error) {
      setError('Erro ao deletar usuário');
      console.error(error);
    }
  };

  return (
    <div className={styles.conteinerGrid}>
      <div className={styles.containerUsuarios}>
        <div className={styles.headerUsuarios}>
          <span className={styles.tag}>Usuários</span>
          <button
            className={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Adicionar Usuário
          </button>
        </div>
        <div className={styles.tabelaGeral}>
          <table className={styles.tabelaUsuarios}>
            <thead>
              <tr>
                <th className={styles.th}>Usuário</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Telefone</th>
                <th className={styles.th}>Nível de Acesso</th>
                <th className={styles.th}>Senha</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td className={styles.td}>{item.user_nome}</td>
                  <td className={styles.td}>{item.user_email}</td>
                  <td className={styles.td}>{item.user_tel}</td>
                  <td className={styles.td}>{getNivelAcessoLabel(item.nivel_id)}</td>
                  <td className={styles.td}>{'*'.repeat(item.user_senha.length)}</td>
                  <td className={styles.td}>
                    <FontAwesomeIcon
                      icon={faPen}
                      className={styles.editIcon}
                      onClick={() => openEditModal(item)} // Passa o usuário inteiro para abrir o modal
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.deleteIcon}
                      onClick={() => deleteUsuario(item.user_id, index)} // Passando o user_id
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalUsuarios}>
          <div className={styles.modalContent}>
            <h2>{isEditMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
            {error && <p className={styles.error}>{error}</p>}

            <label htmlFor="user_nome">Usuário</label>
            <input
              type="text"
              name="user_nome" // Nome do usuário
              id="user_nome"
              value={newUser.user_nome}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              name="user_email" // Email
              id="user_email"
              value={newUser.user_email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="user_tel">Telefone</label>
            <input
              type="text"
              name="user_tel" // Telefone
              id="user_tel"
              value={newUser.user_tel}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="nivel_id">Nível de Acesso</label>
            <select
              name="nivel_id" // Nível de Acesso
              id="nivel_id"
              value={newUser.nivel_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o Nível</option>
              <option value="1">ADMINISTRADOR</option>
              <option value="2">USUARIO</option>
              <option value="3">MOBILE</option>
            </select>

            <label htmlFor="user_senha">Senha</label>
            <input
              type="password"
              name="user_senha"
              id="user_senha"
              value={newUser.user_senha}
              onChange={handleInputChange}
              required
            />

            <button
              className={styles.saveButton}
              onClick={isEditMode ? updateUsuario : addUsuario}
            >
              {isEditMode ? 'Atualizar' : 'Salvar'}
            </button>

            <button
              className={styles.cancelButton}
              onClick={() => {
                setShowModal(false);
                setIsEditMode(false); // Reseta o modo de edição
                setEditingUserId(null); // Reseta o ID do usuário sendo editado
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
