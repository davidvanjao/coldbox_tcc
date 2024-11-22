import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ParametrosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const ParametrosAtivos = () => {
  const cli_id = localStorage.getItem('cli_id');
  const [parametros, setParametros] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editarParam, setEditarParam] = useState(null);
  const [newParameter, setNewParameter] = useState({
    param_interface: '',
    param_minimo: '',
    param_maximo: '',
  });

  // Listar parâmetros associados aos dispositivos do banco
  const listarParametro = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/parametro/${cli_id}`);
      if (response.data.sucesso) {
        setParametros(response.data.dados);
        localStorage.setItem(`parametros_${cli_id}`, JSON.stringify(response.data.dados));
      } else {
        console.error('Erro ao carregar os parâmetros.');
      }
    } catch (error) {
      console.error('Erro ao buscar parâmetros:', error);
    }
  };

  useEffect(() => {
    listarParametro();
  }, []);

  // Abrir modal para edição
  const handleEdit = (item) => {
    setNewParameter({
      param_interface: item.param_interface,
      param_minimo: item.param_minimo,
      param_maximo: item.param_maximo,
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

  const resetFormulario = () => {
    setNewParameter({
      param_interface: '',
      param_minimo: '',
      param_maximo: '',
    });
    setEditarParam(null);
  };

  const closeModal = () => {
    setShowEditModal(false);
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <div className={styles.modalParametros}>
          <div className={styles.modalContentParametros}>
            <h2>Editar Parâmetro</h2>
            <p className={styles.descricaoModalParam}>
              Atualize as informações do parâmetro.
            </p>
            <label htmlFor="param_interface">Equipamento</label>
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
              <button onClick={edtParametro}>Atualizar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParametrosAtivos;
