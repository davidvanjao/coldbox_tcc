import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from './ParametrosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const ParametrosAtivos = () => {
  const equipId = localStorage.getItem('equip_id');
  const [parametros, setParametros] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newParameter, setNewParameter] = useState({
    equip_id: equipId, 
    param_interface: '',
    param_minimo: '',
    param_maximo: '',
  });

  //Função para listar parâmetros
  const listarParametro = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/parametro/${equipId}`); 
      if (response.data.sucesso) {
        setParametros(response.data.dados);
        localStorage.setItem(`parametros_${equipId}`, JSON.stringify(response.data.dados)); //Armazena os parâmetros no local storage
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
    setEditingItemId(item.param_id); // Define o ID do parâmetro que está sendo editado
    setShowEditModal(true); // Abre o modal de edição
  };

  // Função para editar parâmetros
  async function edtParametro() {
    try {
      const response = await axios.patch(`http://127.0.0.1:3333/parametro/${editingItemId}`, newParameter);
      if (response.data.sucesso) {
        // Atualiza a lista de parâmetros com os dados editados
        atualizarParametroNaLista(response.data.dados);
        resetFormulario();
        setShowEditModal(false); // Fecha o modal após a edição
      } else {
        console.error('Erro ao atualizar parâmetro.');
      }
    } catch (error) {
      console.error('Erro ao atualizar parâmetro:', error);
    } finally {
      listarParametro(); // Atualiza a lista após a edição
    }
  }

  // Função para atualizar a lista de parâmetros
  function atualizarParametroNaLista(parametroAtualizado) {
    setParametros((prevParametros) => 
      prevParametros.map(param => 
        param.param_id === editingItemId ? parametroAtualizado : param
      )
    );
  }

  // Função para resetar o formulário
  function resetFormulario() {
    setNewParameter({
      equip_id: equipId, 
      param_interface: '',
      param_minimo: '',
      param_maximo: ''
    });
    setEditingItemId(null); // Reseta o ID do parâmetro que está sendo editado
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
      listarParametro(); //Atualiza a lista e armazena no localStorage
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
      listarParametro(); //Atualiza a lista e armazena no localStorage
    }
  };

  const handleUpdate = async () => {
    await edtParametro(); // Chama a função edtParametro ao atualizar
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
        {/* <h2>Parâmetros Ativos</h2> */}
      </div>
      <div className={styles.tabelaGeral}>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th className={styles.th}>Status</th> */}
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
            <tr key={item.param_id} className={styles.tr}>
              {/* <td className={styles.td}>
                <div className={styles.circularButton}></div>
              </td> */}
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingItemId ? 'Editar Parâmetro' : 'Adicionar Novo Parâmetro'}</h2>
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
            <button className={styles.saveButton} onClick={editingItemId ? handleUpdate : handleSaveNew}>
              {editingItemId ? 'Atualizar' : 'Salvar'}
            </button>
            <button className={styles.cancelButton} onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParametrosAtivos;
