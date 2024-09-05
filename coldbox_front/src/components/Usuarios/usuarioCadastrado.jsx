import React, { useState } from 'react';
import styles from './usuario.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    usuario: '',
    senha: '',
    nivelAcesso: 'Apenas visualizar',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const addUsuario = () => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, newUser]);
    setShowModal(false);
    setNewUser({
      usuario: '',
      senha: '',
      nivelAcesso: 'Apenas visualizar',
    });
  };

  const deleteUsuario = (index) => {
    const updatedUsuarios = [...usuarios];
    updatedUsuarios.splice(index, 1);
    setUsuarios(updatedUsuarios);
  };

  return (
    <div className={styles.conteinerGrid}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>Usuários</span>
          <button
            className={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Adicionar Usuário
          </button>
        </div>
        <div className={styles.tabelaGeral}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Usuário</th>
                <th className={styles.th}>Senha</th>
                <th className={styles.th}>Nível de Acesso</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td className={styles.td}>{item.usuario}</td>
                  <td className={styles.td}>{'*'.repeat(item.senha.length)}</td>
                  <td className={styles.td}>{item.nivelAcesso}</td>
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Adicionar Novo Usuário</h2>
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              name="usuario"
              id="usuario"
              value={newUser.usuario}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              value={newUser.senha}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="nivelAcesso">Nível de Acesso</label>
            <select
              name="nivelAcesso"
              id="nivelAcesso"
              value={newUser.nivelAcesso}
              onChange={handleInputChange}
            >
              <option value="Administrador">Administrador</option>
              <option value="Apenas visualizar">Apenas visualizar</option>
            </select>

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
