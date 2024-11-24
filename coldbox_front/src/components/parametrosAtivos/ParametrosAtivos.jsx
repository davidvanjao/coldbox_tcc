import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ParametrosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ParametrosAtivos = () => {
  const cli_id = localStorage.getItem('cli_id');
  const [parametros, setParametros] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);  // Modal para adicionar
  const [editarParam, setEditarParam] = useState(null);
  const [newParameter, setNewParameter] = useState({
    param_interface: '', // Nome do equipamento
    param_minimo: '',
    param_maximo: '',
    equip_id: '',  // ID do equipamento selecionado
  });

  // Listar parâmetros
  const listarParametro = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/parametro/${cli_id}`);
      if (response.data.sucesso) {
        setParametros(response.data.dados);
      } else {
        console.error('Erro ao carregar os parâmetros.');
      }
    } catch (error) {
      console.error('Erro ao buscar parâmetros:', error);
    }
  };

  // Listar equipamentos
  const listarEquipamentos = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/equipamento/${cli_id}`);
      if (response.data.sucesso) {
        setEquipamentos(response.data.dados);  // Equipamentos disponíveis
      } else {
        console.error('Erro ao carregar os equipamentos.');
      }
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
    }
  };

  useEffect(() => {
    listarParametro();
    listarEquipamentos();  // Carregar os equipamentos quando o componente for montado
  }, []);

  // Abrir modal para edição
  const handleEdit = (item) => {
    setNewParameter({
      param_interface: item.param_interface,
      param_minimo: item.param_minimo,
      param_maximo: item.param_maximo,
      equip_id: item.equip_id, // Adicionar o ID do equipamento no caso de edição
    });
    setEditarParam(item.param_id);
    setShowEditModal(true);
  };

  // Atualizar parâmetro
  const edtParametro = async () => {
    try {
      const response = await axios.patch(`http://127.0.0.1:3333/parametro/${editarParam}`, newParameter);
      if (response.data.sucesso) {
        setParametros((prevParametros) =>
          prevParametros.map((param) =>
            param.param_id === editarParam ? response.data.dados : param
          )
        );
        resetFormulario();
        setShowEditModal(false);
      } else {
        console.error('Erro ao atualizar parâmetro.');
      }
    } catch (error) {
      console.error('Erro ao atualizar parâmetro:', error);
    }
  };

  // Adicionar novo parâmetro
  const adicionarParametro = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:3333/parametro`, newParameter);
      if (response.data.sucesso) {
        // Atualizar a lista de parâmetros com o novo parâmetro
        setParametros((prevParametros) => [...prevParametros, response.data.dados]);
        resetFormulario();
        setShowAddModal(false);  // Fechar o modal
      } else {
        console.error('Erro ao adicionar parâmetro.');
      }
    } catch (error) {
      console.error('Erro ao adicionar parâmetro:', error);
    }
  };

  // Apagar parâmetro
  const apagarParametro = async (param_id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:3333/parametro/${param_id}`);
      if (response.data.sucesso) {
        setParametros((prevParametros) => prevParametros.filter(param => param.param_id !== param_id));
      } else {
        console.error('Erro ao apagar parâmetro.');
      }
    } catch (error) {
      console.error('Erro ao apagar parâmetro:', error);
    }
  };

  const resetFormulario = () => {
    setNewParameter({
      param_interface: '',
      param_minimo: '',
      param_maximo: '',
      equip_id: '',  // Resetar o ID do equipamento
    });
    setEditarParam(null);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    resetFormulario();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewParameter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.tag}>Parâmetros Ativos</span>
      </div>

      <button className={styles.addButton} onClick={() => setShowAddModal(true)}>Adicionar Parâmetro</button>

      <div className={styles.tabelaGeral}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Modelo</th>
              <th className={styles.th}>Equipamento</th>
              <th className={styles.th}>Temp. Min</th>
              <th className={styles.th}>Temp. Máx</th>
              <th className={styles.th}>Data Cadastro</th>
              <th className={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {parametros.map((item) => (
              <tr key={item.param_id} className={item.param_id % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={styles.td}>{item.equip_modelo}</td>
                <td className={styles.td}>{item.param_interface}</td>
                <td className={styles.td}>{item.param_minimo}</td>
                <td className={styles.td}>{item.param_maximo}</td>
                <td className={styles.td}>{item.param_data}</td>
                <td className={styles.td}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={styles.editIcon}
                    onClick={() => handleEdit(item)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={styles.deleteIcon}
                    onClick={() => apagarParametro(item.param_id)}  // Chama a função de exclusão
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para adicionar parâmetro */}
      {showAddModal && (
        <div className={styles.modalParametros}>
          <div className={styles.modalContentParametros}>
            <h2>Adicionar Parâmetro</h2>
            <label htmlFor="equip_id">Escolha o Equipamento</label>
            <select
              name="equip_id"
              id="equip_id"
              value={newParameter.equip_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um Equipamento</option>
              {equipamentos.map((equip) => (
                <option key={equip.equip_id} value={equip.equip_id}>
                  {equip.equip_modelo} - {equip.equip_tipo}
                </option>
              ))}
            </select>
            <label htmlFor="param_interface">Equipamento (Nome)</label>
            <input
              type="text"
              name="param_interface"
              id="param_interface"
              value={newParameter.param_interface}
              onChange={handleChange}
              required
            />
            <label htmlFor="param_minimo">Temp. Min</label>
            <input
              type="text"
              name="param_minimo"
              id="param_minimo"
              value={newParameter.param_minimo}
              onChange={handleChange}
              required
            />
            <label htmlFor="param_maximo">Temp. Máx</label>
            <input
              type="text"
              name="param_maximo"
              id="param_maximo"
              value={newParameter.param_maximo}
              onChange={handleChange}
              required
            />
            <div className={styles.modalActions}>
              <button onClick={closeModal}>Cancelar</button>
              <button onClick={adicionarParametro}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar parâmetro */}
      {showEditModal && (
        <div className={styles.modalParametros}>
          <div className={styles.modalContentParametros}>
            <h2>Editar Parâmetro</h2>
            <label htmlFor="param_interface">Equipamento (Nome)</label>
            <input
              type="text"
              name="param_interface"
              id="param_interface"
              value={newParameter.param_interface}
              onChange={handleChange}
              required
            />
            <label htmlFor="param_minimo">Temp. Min</label>
            <input
              type="text"
              name="param_minimo"
              id="param_minimo"
              value={newParameter.param_minimo}
              onChange={handleChange}
              required
            />
            <label htmlFor="param_maximo">Temp. Máx</label>
            <input
              type="text"
              name="param_maximo"
              id="param_maximo"
              value={newParameter.param_maximo}
              onChange={handleChange}
              required
            />
            <div className={styles.modalActions}>
              <button onClick={closeModal}>Cancelar</button>
              <button onClick={edtParametro}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParametrosAtivos;
