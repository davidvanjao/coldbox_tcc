import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from './ParametrosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const ParametrosAtivos = () => {
  const equipId = localStorage.getItem('equip_id');
  const [parametros, setParametros] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editarParam, setEditarParam] = useState(null);
  const [newParameter, setNewParameter] = useState({
    equip_id: equipId, 
    param_interface: '',
    param_minimo: '',
    param_maximo: '',
  });

  const listarParametro = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/parametro/${equipId}`); 
      if (response.data.sucesso) {
        setParametros(response.data.dados);
        localStorage.setItem(`parametros_${equipId}`, JSON.stringify(response.data.dados));
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

  const handleEdit = (item) => {
    setNewParameter({
        equip_id: item.equip_id,
        param_interface: item.param_interface,
        param_minimo: item.param_minimo,
        param_maximo: item.param_maximo
    });
    setEditarParam(item.param_id);
    setShowEditModal(true);
  };

  async function edtParametro() {
    try {
      const response = await axios.patch(`http://127.0.0.1:3333/parametro/${editarParam}`, newParameter);
      if (response.data.sucesso) {
        atualizarParametroNaLista(response.data.dados);
        resetFormulario();
        setShowEditModal(false);
      } else {
        console.error('Erro ao atualizar parâmetro.');
      }
    } catch (error) {
      console.error('Erro ao atualizar parâmetro:', error);
    } finally {
      listarParametro();
    }
  }

  function atualizarParametroNaLista(parametroAtualizado) {
    setParametros((prevParametros) => 
      prevParametros.map(param => 
        param.param_id === editarParam ? parametroAtualizado : param
      )
    );
  }

  function resetFormulario() {
    setNewParameter({
      equip_id: equipId, 
      param_interface: '',
      param_minimo: '',
      param_maximo: ''
    });
    setEditarParam(null);
  }

  const handleDelete = async (paramId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:3333/parametro/${paramId}`);
      if (response.data.sucesso) {
        setParametros(parametros.filter(param => param.param_id !== paramId));
      } else {
        console.error('Erro ao deletar parâmetro');
      }
    } catch (error) {
      console.error('Erro ao deletar parâmetro:', error);
    } finally {
      listarParametro();
    }
  };

  const handleSaveNew = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3333/parametro', newParameter);
      if (response.data.sucesso) {
        listarParametro();
        closeModal();
      } else {
        console.error('Erro ao salvar o novo parâmetro.');
      }
    } catch (error) {
      console.error('Erro ao salvar o novo parâmetro:', error);
    } finally {
      listarParametro();
    }
  };

  const handleUpdate = async () => {
    await edtParametro();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewParameter((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setShowEditModal(false);
    resetFormulario();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.tag}>Parâmetros Ativos</span>
        <button
          className={styles.botaoAddParametro}
          onClick={() => {
            resetFormulario();
            setShowEditModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Adicionar Parâmetro
        </button>
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
                <FontAwesomeIcon 
                  icon={faTrash} 
                  className={styles.deleteIcon} 
                  onClick={() => handleDelete(item.param_id)} 
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
              <h2>
                {editarParam ? 'Editar Parâmetro' : 'Adicionar Novo Parâmetro'}
              </h2>
              <p className={styles.descricaoModalParam}>
                {editarParam ? 'Atualize as informações do parâmetro.' : 'Adicione um novo parâmetro para o monitoramento preciso e correto da temperatura.'}
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
              <button onClick={editarParam ? handleUpdate : handleSaveNew}>
                {editarParam ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParametrosAtivos;
