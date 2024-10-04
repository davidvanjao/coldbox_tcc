"use client";

import { useState, useEffect } from 'react';
import styles from './usuario.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Usuarios = () => {
    const cliId = localStorage.getItem('cli_id');
    const userId = localStorage.getItem('userId');
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        user_nome: '',
        user_email: '',
        user_tel: '',
        nivel_id: '',
        user_senha: '',
        user_imagem_perfil: '',
        cli_id: cliId
    });
    console.log(newUser);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [niveisAcesso, setNiveisAcesso] = useState([]); // Novo estado
    // const [ufs, setUfs] = useState([]); // Estado para UFs

    useEffect(() => {
        listarUsuarios();
        cadastrarUsuarios();
        listarNiveisAcesso(); // Chama a função para buscar níveis de acesso
        // listaUfs(); // Chama a função para buscar UFs
    }, []);

    async function listarUsuarios() {
        try {
            const response = await axios.get('http://127.0.0.1:3333/usuarios/' + cliId);
            console.log(response.data); // Verifique a estrutura da resposta
            if (response.data.sucesso) {
                setUsuarios(response.data.dados);
                console.log('Usuários:', usuarios); // Verifique se o estado foi atualizado
            } else {
                setError('Erro ao listar usuários');
            }
        } catch (error) {
            setError('Erro ao listar usuários');
            console.error(error);
        }
    }


    async function listarNiveisAcesso() {
        try {
            const response = await axios.get('http://127.0.0.1:3333/nivel_acesso'); // URL da API para UFs
            if (response.data.sucesso) {
                setNiveisAcesso(response.data.dados);
            }
        } catch (error) {
            setError('Erro ao buscar Niveis de Acesso');
            console.error(error);
        }
    }

    const deleteUsuario = async (userId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3333/usuarios/${userId}`);
            if (response.data.sucesso) {
                // Atualiza a lista de usuários após a deleção
                setUsuarios((prevUsuarios) => prevUsuarios.filter(user => user.user_id !== userId));
            } else {
                setError('Erro ao deletar usuário');
            }
        } catch (error) {
            setError('Erro ao deletar usuário');
            console.error(error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
        console.log(newUser); // Verifique se o estado está sendo atualizado conforme esperado
    };


    async function cadastrarUsuarios() {
        try {
            const response = await axios.post('http://127.0.0.1:3333/usuarios', newUser); 
            if (response.data.sucesso) {
                // Adiciona o novo usuário à lista imediatamente
                setUsuarios((prevUsuarios) => [...prevUsuarios, response.data.dados]); 
                // Limpa o formulário
                setNewUser({
                    user_nome: '',
                    user_email: '',
                    user_tel: '',
                    nivel_id: '',
                    user_senha: '', 
                    user_imagem_perfil: '',
                    cli_id: cliId
                });
                setShowModal(false); // Fecha o modal após a adição
                setError(null); // Limpa qualquer mensagem de erro
            } else {
                setError('Erro ao adicionar usuário');
            }
        } catch (error) {
            setError('Erro ao adicionar usuário');
            console.error(error);
        }
    }
    

    const edtUsuario = async () => {
        try {
            const response = await axios.patch(`http://127.0.0.1:3333/usuarios/${newUser.user_id}`, newUser);
            if (response.data.sucesso) {
                // Atualiza a lista de usuários com os dados editados
                setUsuarios((prevUsuarios) => 
                    prevUsuarios.map(user => 
                        user.user_id === newUser.user_id ? response.data.dados : user
                    )
                );
                setShowModal(false); // Fecha o modal após a edição
                setNewUser({
                    user_nome: '',
                    user_email: '',
                    user_tel: '',
                    nivel_id: '',
                    user_senha: '',
                    user_imagem_perfil: '',
                    cli_id: cliId
                });
                setError(null); // Limpa qualquer mensagem de erro
            } else {
                setError('Erro ao atualizar usuário');
            }
        } catch (error) {
            setError('Erro ao atualizar usuário');
            console.error(error);
        }
    };
    

    function openEditModal(user) {
        setError(null); // Limpa o erro ao abrir o modal
        setNewUser(user);
        setShowModal(true);
    }

    function openAddModal() {
        setError(null); // Limpa o erro ao abrir o modal para adicionar
        setNewUser({
            user_nome: '',
            user_email: '',
            user_tel: '',
            nivel_id: '',
            user_senha: '',
            user_imagem_perfil: '',
            cli_id: cliId
        });
        setShowModal(true);
        setIsEditMode(false);
    }

    // console.log(newUser);
    return (
        <div className={styles.conteinerGrid}>
            <div className={styles.containerUsuarios}>
                <div className={styles.headerUsuarios}>
                    <span className={styles.tag}>Usuários</span>
                    <button
                        className={styles.addButton}
                        onClick={openAddModal}  // Use openAddModal para adicionar novos usuários
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
                            {usuarios.map((item) => (
                                <tr key={item.user_id} className={item.index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <td className={styles.td}>{item.user_nome}</td>
                                    <td className={styles.td}>{item.user_email}</td>
                                    <td className={styles.td}>{item.user_tel}</td>
                                    <td className={styles.td}>{niveisAcesso.find(n => n.nivel_id === item.nivel_id)?.nivel_acesso || 'N/A'}</td>
                                    <td className={styles.td}>{'*'.repeat(item.user_senha ? item.user_senha.length : 0)}</td>
                                    <td className={styles.td}>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            className={styles.editIcon}
                                            onClick={() => openEditModal(item)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className={styles.deleteIcon}
                                            onClick={() => deleteUsuario(item.user_id)}
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
                            onClick={() => {
                                isEditMode ? edtUsuario() : cadastrarUsuarios(); // Verifica o modo de edição antes de salvar
                            }}
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
