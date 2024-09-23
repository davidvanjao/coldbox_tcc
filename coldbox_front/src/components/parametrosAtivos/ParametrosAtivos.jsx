import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ou você pode usar fetch
import styles from './ParametrosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ParametrosAtivos = () => {
  const [equipments, setEquipments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [newEquipment, setNewEquipment] = useState({
    equipamento: '',
    nomeAtivo: '',
    tempMin: '',
    tempMax: '',
    data: '',
  });

  // Carregar os dados do banco ao montar o componente
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get('/api/parametros'); // Substitua pela sua URL correta
        setEquipments(response.data.dados); // Use os dados da resposta
      } catch (error) {
        console.error('Erro ao buscar equipamentos:', error);
      }
    };

    fetchEquipments();
  }, []);

  // Função para deletar um equipamento
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/parametros/${id}`); // Substitua pela sua URL correta
      setEquipments(equipments.filter((equipment) => equipment.param_id !== id));
    } catch (error) {
      console.error('Erro ao deletar equipamento:', error);
    }
  };

  // Função para iniciar a edição de um equipamento
  const handleEdit = (equipment) => {
    setCurrentEquipment(equipment);
    setIsEditing(true);
    setShowModal(true);
  };

  // Função para iniciar a adição de um novo equipamento
  const handleAdd = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  // Função para adicionar um novo equipamento e enviar para a API
  const addEquipment = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3333/parametros', newEquipment); // Substitua pela sua URL correta

      if (response.data.sucesso) {
        setShowModal(false);
        setEquipments([...equipments, response.data.dados]); // Atualiza a lista de equipamentos
        setNewEquipment({
          equipamento: '',
          nomeAtivo: '',
          tempMin: '',
          tempMax: '',
          data: '',
        });
      }
    } catch (error) {
      setError('Erro ao adicionar equipamento');
      console.error(error);
    }
  };

  // Função para salvar um novo equipamento ou atualizar um existente
  const handleSave = async () => {
    if (isEditing) {
      try {
        await axios.put(`/api/parametros/${currentEquipment.param_id}`, currentEquipment); // Substitua pela sua URL correta
        setEquipments(
          equipments.map((item) =>
            item.param_id === currentEquipment.param_id ? currentEquipment : item
          )
        );
      } catch (error) {
        console.error('Erro ao editar equipamento:', error);
      }
    } else {
      addEquipment(); // Chama a função de adicionar novo equipamento
    }
    setShowModal(false);
    resetForm();
  };

  // Função para capturar as mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setCurrentEquipment({ ...currentEquipment, [name]: value });
    } else {
      setNewEquipment({ ...newEquipment, [name]: value });
    }
  };

  // Função para resetar o formulário após adicionar/editar
  const resetForm = () => {
    setNewEquipment({
      equipamento: '',
      nomeAtivo: '',
      tempMin: '',
      tempMax: '',
      data: '',
    });
    setCurrentEquipment(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Parâmetros Ativos</h2>
        <button className={styles.addButton} onClick={handleAdd}>
          Adicionar Equipamento
        </button>
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
          {equipments.map((item) => (
            <tr key={item.param_id} className={styles.tr}>
              <td className={styles.td}>
                <div className={styles.circularButton}></div>
              </td>
              <td className={styles.td}>{item.equipamento}</td>
              <td className={styles.td}>{item.nomeAtivo}</td>
              <td className={styles.td}>{item.tempMin}</td>
              <td className={styles.td}>{item.tempMax}</td>
              <td className={styles.td}>{item.data}</td>

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
            <h3>{isEditing ? 'Editar Equipamento' : 'Novo Equipamento'}</h3>
            {error && <p className={styles.error}>{error}</p>} {/* Exibir erro se houver */}
            <input
              type="text"
              name="equipamento"
              placeholder="Equipamento"
              value={isEditing ? currentEquipment?.equipamento : newEquipment.equipamento}
              onChange={handleChange}
            />
            <input
              type="text"
              name="nomeAtivo"
              placeholder="Nome/Ativo"
              value={isEditing ? currentEquipment?.nomeAtivo : newEquipment.nomeAtivo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tempMin"
              placeholder="Temp. Min"
              value={isEditing ? currentEquipment?.tempMin : newEquipment.tempMin}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tempMax"
              placeholder="Temp. Máx"
              value={isEditing ? currentEquipment?.tempMax : newEquipment.tempMax}
              onChange={handleChange}
            />
            <input
              type="text"
              name="data"
              placeholder="Data"
              value={isEditing ? currentEquipment?.data : newEquipment.data}
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
