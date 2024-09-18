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

  useEffect(() => {
    listarUsuarios();
  }, []);

  async function listarUsuarios() {
    try {
      const response = await axios.get('http://10.67.23.19:3333/usuarios');

      if (response.data.sucesso) {
        setUsuarios(response.data.dados);
      }
    } catch (error) {
    setError('Erro ao adicionar usuário');
    console.error(error);
  }
}

// Atualiza os valores do novo usuário conforme o input
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewUser((prev) => ({ ...prev, [name]: value }));
};

// Adiciona um novo usuário e faz requisição para a API
const addUsuario = async () => {
  try {
    const response = await axios.post('http://10.67.23.19:3333/usuarios', newUser);

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

// Remove o usuário da lista
const deleteUsuario = (index) => {
  const updatedUsuarios = [...usuarios];
  updatedUsuarios.splice(index, 1);
  setUsuarios(updatedUsuarios);
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
              <tr
                key={index}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td className={styles.td}>{item.user_nome}</td>
                <td className={styles.td}>{item.user_email}</td>
                <td className={styles.td}>{item.user_tel}</td>
                <td className={styles.td}>{item.nivel_id}</td>
                <td className={styles.td}>{'*'.repeat(item.user_senha.length)}</td>
                <td className={styles.td}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={styles.editIcon}
                    onClick={() => console.log('Editar usuário', index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={styles.deleteIcon}
                    onClick={() => deleteUsuario(index)}
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
          <h2>Adicionar Novo Usuário</h2>
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
          <input
            type="number"
            name="nivel_id" // Nível de Acesso
            id="nivel_id"
            value={newUser.nivel_id}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="user_senha">Senha</label>
          <input
            type="password"
            name="user_senha"
            id="user_senha"
            value={newUser.user_senha}
            onChange={handleInputChange}
            required
          />

          <div className={styles.modalActions}>
            <button onClick={addUsuario}>Adicionar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Usuarios;
