import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from './ParametrosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const ParametrosAtivos = () => {
  const equipId = localStorage.getItem('equip_id');
  const [parametros, setParametros] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newParameter, setNewParameter] = useState({
    equip_id: equipId, 
    param_interface: '',
    param_minimo: '',
    param_maximo: '',
  });

  // Função para listar parâmetros
  const listarParametro = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/parametro/${equipId}`); 
      if (response.data.sucesso) {
        setParametros(response.data.dados);
      } else {
        console.error('Erro ao carregar os parâmetros.');
      }
    } catch (error) {
      console.error('Erro ao buscar parâmetros:', error);
    }
  };

  useEffect(() => {
    listarParametro(); // Chama a função listarParametro
  }, []);

  const handleEdit = (item) => {
    setNewParameter(item); // Preenche o formulário com os dados do item a ser editado
    setIsEditing(true); // Define que estamos no modo de edição
    setEditingItemId(item.param_id); // Guarda o ID do item que está sendo editado
    setShowEditModal(true); // Abre o modal de edição
  };

  const handleDelete = async (paramId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:3333/parametro/${paramId}`);
      if (response.data.sucesso) {
        // Atualiza a lista de parâmetros após a exclusão
        setParametros((prevParametros) => prevParametros.filter(param => param.param_id !== paramId));
      } else {
        console.error('Erro ao deletar parâmetro');
      }
    } catch (error) {
      console.error('Erro ao deletar parâmetro:', error);
    }
  };

  const handleSave = async () => {
    try {
      const url = isEditing 
        ? `http://127.0.0.1:3333/parametro/${editingItemId}` 
        : 'http://127.0.0.1:3333/parametro';
      const method = isEditing ? 'put' : 'post';
      const response = await axios[method](url, newParameter);

      if (response.data.sucesso) {
        listarParametro(); // Atualiza a lista de parâmetros
        setShowEditModal(false); // Fecha o modal
        setIsEditing(false); // Reseta o modo de edição
        setEditingItemId(null); // Limpa o ID do item que está sendo editado
        setNewParameter({ // Reseta os campos do novo parâmetro
          equip_id: equipId, 
          param_interface: '',
          param_minimo: '',
          param_maximo: '',
        });
      } else {
        console.error('Erro ao salvar o parâmetro.');
      }
    } catch (error) {
      console.error('Erro ao salvar o parâmetro:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewParameter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Parâmetros Ativos</h2>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ON/OFF</th>
            <th className={styles.th}>Modelo</th>
            <th className={styles.th}>Equipamento</th>
            <th className={styles.th}>Temp. Min</th>
            <th className={styles.th}>Temp. Máx</th>
            <th className={styles.th}>Data</th>
            <th className={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {parametros.map((item) => (
            <tr key={item.param_id} className={styles.tr}>
              <td className={styles.td}>
                <div className={styles.circularButton}></div>
              </td>
              <td className={styles.td}>{item.equip_modelo}</td>
              <td className={styles.td}>{item.param_interface}</td>
              <td className={styles.td}>{item.param_minimo}</td>
              <td className={styles.td}>{item.param_maximo}</td>
              <td className={styles.td}>{item.param_data}</td>
              <td className={styles.td}>
                <button className={styles.actionButton} onClick={() => handleEdit(item)}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button className={styles.actionButton} onClick={() => handleDelete(item.param_id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{isEditing ? 'Editar Parâmetro' : 'Adicionar Novo Parâmetro'}</h2>
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
            <button className={styles.saveButton} onClick={handleSave}>
              {isEditing ? 'Atualizar' : 'Salvar'}
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => {
                setShowEditModal(false); // Fecha o modal
                setIsEditing(false); // Reseta o modo de edição
                setEditingItemId(null); // Limpa o ID do item que está sendo editado
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

export default ParametrosAtivos;
