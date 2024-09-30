import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from './ParametrosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ParametrosAtivos = () => {
  const [parametros, setParametros] = useState([]);
  const equipId = localStorage.getItem('equip_id');
  const [allModels, setAllModels] = useState([]); // Para armazenar todos os modelos de equipamentos
  const [isEditing, setIsEditing] = useState(false);
  const [currentParametro, setCurrentParametro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [equipModelo, setEquipModelo] = useState([]); // Novo estado
  const [newParameter, setNewParameter] = useState({
  


    equip_id: '', // Alteramos o nome para equip_id
    param_interface: '',
    param_minimo: '',
    param_maximo: '',
    data: '',
  });

  // Carregar os dados do banco ao montar o componente
  useEffect(() => {
    listarParametro();
    async function listarParametro() {
      try {
        const response = await axios.get('http://127.0.0.1:3333/parametro/' + equipId);
        if (response.data.sucesso) {
          setParametros(response.data.dados);
        } else {
          setError('Erro ao carregar os parametros.');
        }
      } catch (error) {
        setError('Erro ao buscar parametros.');
      }
    };

    
  }
  );

  // Função para deletar um parâmetro
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3333/parametro/${id}`);
      setParametros(parametros.filter((parametros) => parametros.param_id !== id));
    } catch (error) {
      console.error('Erro ao deletar parâmetro:', error);
    }
  };

  // Função para iniciar a edição de um parâmetro
  const handleEdit = (parametros) => {
    setCurrentParametro(parametros);
    setIsEditing(true);
    setShowModal(true);
  };

  // Função para iniciar a adição de um novo parâmetro
  const handleAdd = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  // Função para adicionar um novo parâmetro e enviar para a API
  const addParameter = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3333/parametro', newParameter);
      if (response.data.sucesso) {
        setShowModal(false);
        setParametros([...parametros, response.data.dados]); // Atualiza a lista de parâmetros
        resetForm();
      } else {
        setError('Erro ao adicionar parâmetro');
      }
    } catch (error) {
      setError('Erro ao adicionar parâmetro');
    }
  };

  // Função para salvar um novo parâmetro ou atualizar um existente
  const handleSave = async () => {
    if (isEditing) {
      try {
        await axios.put(`http://127.0.0.1:3333/parametro/${currentParametro.param_id}`, currentParametro);
        setParametros(
          parametros.map((item) =>
            item.param_id === currentParametro.param_id ? currentParametro : item
          )
        );
      } catch (error) {
        console.error('Erro ao editar parâmetro:', error);
      }
    } else {
      addParameter(); // Chama a função de adicionar novo parâmetro
    }
    setShowModal(false);
    resetForm();
  };

  // Função para capturar as mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setCurrentParametro({ ...currentParametro, [name]: value });
    } else {
      setNewParameter({ ...newParameter, [name]: value });
    }
  };

  // Função para resetar o formulário após adicionar/editar
  const resetForm = () => {
    setNewParameter({
      equip_id: '',
      param_interface: '',
      param_minimo: '',
      param_maximo: '',
      data: '',
    });
    setCurrentParametro(null);
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
            <th className={styles.th}>Equipamento</th>
            <th className={styles.th}>Nome/Interface</th>
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
                <button
                  className={styles.actionButton}
                  onClick={() => handleEdit(item)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleDelete(item.param_id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{isEditing ? 'Editar Parâmetro' : 'Novo Parâmetro'}</h3>
            {error && <p className={styles.error}>{error}</p>}
            
            <label htmlFor="equip_id">Modelos de Equipamento</label>
            <select
              name="equip_id"
              value={isEditing ? currentParametro?.equip_id : newParameter.equip_id}
              onChange={handleChange}
            >
              <option value="">Selecione um Equipamento</option>
              {allModels.map((model) => (
                <option key={model.equip_id} value={model.equip_modelo}>
                  {model.equip_modelo}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="param_interface"
              placeholder="Nome/Interface"
              value={isEditing ? currentParametro?.param_interface : newParameter.param_interface}
              onChange={handleChange}
            />
            <input
              type="text"
              name="param_minimo"
              placeholder="Temp. Min"
              value={isEditing ? currentParametro?.param_minimo : newParameter.param_minimo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="param_maximo"
              placeholder="Temp. Máx"
              value={isEditing ? currentParametro?.param_maximo : newParameter.param_maximo}
              onChange={handleChange}
            />
            <input
              type="date"
              name="data"
              value={isEditing ? currentParametro?.data : newParameter.data}
              onChange={handleChange}
            />
            <button className={styles.saveButton} onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParametrosAtivos;
