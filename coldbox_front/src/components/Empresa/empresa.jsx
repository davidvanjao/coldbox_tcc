import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Empresa.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const Empresa = () => {
  const cliId = localStorage.getItem('cli_id');
  const [empresa, setEmpresa] = useState([]);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [dadosEdicao, setDadosEdicao] = useState({
    cli_razaoSocial: '',
    cli_endereco: '',
    cli_cidade: '',
    cli_estado: '',
    cli_contrato: '',
  });

  // Função para buscar os dados da empresa
  const carregarEmpresa = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/cliente/${cliId}`);
      if (response.data.sucesso) {
        setEmpresa(response.data.dados);
      } else {
        console.error('Erro ao carregar as informações da empresa.');
      }
    } catch (error) {
      console.error('Erro ao buscar informações da empresa:', error);
    }
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    carregarEmpresa();
  }, []);

  // Função para abrir o modal de edição
  const abrirModalEditar = (item) => {
    setDadosEdicao({
      cli_razaoSocial: item.cli_razaoSocial || '',
      cli_endereco: item.cli_endereco || '',
      cli_cidade: item.cli_cidade || '',
      cli_estado: item.cli_estado || '',
      cli_contrato: item.cli_contrato || '',
    });
    setMostrarModalEditar(true);
  };

  // Função para salvar as alterações
  const salvarAlteracoes = async () => {
    try {
      const response = await axios.patch(`http://127.0.0.1:3333/cliente/${cliId}`, dadosEdicao);
      if (response.data.sucesso) {
        carregarEmpresa(); // Atualiza as informações na tela
        fecharModal();
      } else {
        console.error('Erro ao atualizar as informações da empresa.');
      }
    } catch (error) {
      console.error('Erro ao atualizar as informações:', error);
    }
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setMostrarModalEditar(false);
  };

  // Função para gerenciar as alterações no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosEdicao((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.containerMaior}>
      <div className={styles.containerMenor}>
        <span className={styles.titulo}>Informações da Empresa</span>
      </div>
      <div className={styles.tabelaEmpresa}>
        <table className={styles.tableTabela}>
          <thead>
            <tr>
              <th className={styles.th}>Razão Social</th>
              <th className={styles.th}>Endereço</th>
              <th className={styles.th}>Cidade</th>
              <th className={styles.th}>Estado</th>
              <th className={styles.th}>Contrato</th>
              <th className={styles.th}>Inicio do Contrato</th>
              <th className={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {empresa.map((item) => (
              <tr key={item.param_id} className={item.param_id % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={styles.td}>{item.cli_razaoSocial}</td>
                <td className={styles.td}>{item.cli_endereco}</td>
                <td className={styles.td}>{item.cli_cidade}</td>
                <td className={styles.td}>{item.cli_estado}</td>
                <td className={styles.td}>{item.cli_contrato}</td>
                <td className={styles.td}>{item.cli_data}</td>
                <td className={styles.td}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={styles.editIcon}
                    onClick={() => abrirModalEditar(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModalEditar && (
        <div className={styles.modalEdicao}>
          <div className={styles.modalConteudoEmpresa}>
            <h2>Editar Informações da Empresa</h2>
            <label htmlFor="cli_razaoSocial">Razão Social</label>
            <input
              type="text"
              name="cli_razaoSocial"
              id="cli_razaoSocial"
              value={dadosEdicao.cli_razaoSocial}
              onChange={handleInputChange}
            />

            <label htmlFor="cli_endereco">Endereço</label>
            <input
              type="text"
              name="cli_endereco"
              id="cli_endereco"
              value={dadosEdicao.cli_endereco}
              onChange={handleInputChange}
            />

            <label htmlFor="cli_cidade">Cidade</label>
            <input
              type="text"
              name="cli_cidade"
              id="cli_cidade"
              value={dadosEdicao.cli_cidade}
              onChange={handleInputChange}
            />

            <label htmlFor="cli_estado">Estado</label>
            <input
              type="text"
              name="cli_estado"
              id="cli_estado"
              value={dadosEdicao.cli_estado}
              onChange={handleInputChange}
            />

            <label htmlFor="cli_contrato">Contrato</label>
            <input
              type="text"
              name="cli_contrato"
              id="cli_contrato"
              value={dadosEdicao.cli_contrato}
              onChange={handleInputChange}
            />

            <div className={styles.modalActions}>
              <button onClick={fecharModal}>Cancelar</button>
              <button onClick={salvarAlteracoes}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empresa;
