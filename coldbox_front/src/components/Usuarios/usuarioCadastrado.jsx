"use client";

import { useState, useEffect } from 'react';
import styles from './usuario.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        user_nome: '',
        user_email: '',
        user_tel: '',
        nivel_id: '',
        user_senha: '',
    });
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [niveisAcesso, setNiveisAcesso] = useState([]); // Novo estado
    const [ufs, setUfs] = useState([]); // Estado para UFs

    useEffect(() => {
        listarUsuarios();
        listarNiveisAcesso(); // Chama a função para buscar níveis de acesso
        listaUfs(); // Chama a função para buscar UFs
    }, []);

    async function listarUsuarios() {
        try {
            const response = await axios.get('http://127.0.0.1:3333/usuarios');
            if (response.data.sucesso) {
                setUsuarios(response.data.dados);
            }
        } catch (error) {
            setError('Erro ao listar usuários');
            console.error(error);
        }
    }

    async function listarNiveisAcesso(request, response) {
      try {
          const sql = `SELECT nivel_id, nivel_acesso FROM novo_nivel_acesso;`; // SQL para buscar níveis de acesso
          const niveis = await db.query(sql);
          const nItens = niveis[0].length;
  
          return response.status(200).json({
              sucesso: true,
              mensagem: 'Lista de níveis de acesso.',
              dados: niveis[0],
              nItens
          });
      } catch (error) {
          return response.status(500).json({
              sucesso: false,
              mensagem: 'Erro na requisição.',
              dados: error.message
          });
      }
  }
    async function listaUfs() {
        try {
            const response = await axios.get('http://127.0.0.1:3333/ufs'); // URL da API para UFs
            if (response.data.sucesso) {
                setUfs(response.data.dados);
            }
        } catch (error) {
            setError('Erro ao buscar UFs');
            console.error(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

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
                                    <td className={styles.td}>{niveisAcesso.find(n => n.nivel_id === item.nivel_id)?.nivel_acesso || 'N/A'}</td>
                                    <td className={styles.td}>{'*'.repeat(item.user_senha.length)}</td>
                                    <td className={styles.td}>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            className={styles.editIcon}
                                            onClick={() => openEditModal(item)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className={styles.deleteIcon}
                                            onClick={() => deleteUsuario(item.user_id, index)}
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
                            name="user_nome"
                            id="user_nome"
                            value={newUser.user_nome}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="user_email">Email</label>
                        <input
                            type="email"
                            name="user_email"
                            id="user_email"
                            value={newUser.user_email}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="user_tel">Telefone</label>
                        <input
                            type="text"
                            name="user_tel"
                            id="user_tel"
                            value={newUser.user_tel}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="nivel_id">Nível de Acesso</label>
                        <select
                            name="nivel_id"
                            id="nivel_id"
                            value={newUser.nivel_id}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione o Nível</option>
                            {niveisAcesso.map((nivel) => (
                                <option key={nivel.nivel_id} value={nivel.nivel_id}>
                                    {nivel.nivel_acesso}
                                </option>
                            ))}
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
                                setIsEditMode(false);
                                setEditingUserId(null);
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
