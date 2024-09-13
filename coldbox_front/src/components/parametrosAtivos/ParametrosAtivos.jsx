import React, { useState } from 'react';
import styles from './ParametrosAtivos.module.css';
import parametrosAtivosDados from './parametrosAtivosDados';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ParametrosAtivos = () => {
  const [equipments, setEquipments] = useState(parametrosAtivosDados);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    equipamento: '',
    nomeAtivo: '',
    tempMin: '',
    tempMax: '',
  });

  const handleDelete = (id) => {
    setEquipments(equipments.filter((equipment) => equipment.id !== id));
  };

  const handleEdit = (equipment) => {
    setCurrentEquipment(equipment);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSave = () => {
    if (isEditing) {
      setEquipments(
        equipments.map((item) =>
          item.id === currentEquipment.id ? currentEquipment : item
        )
      );
    } else {
      const newId = equipments.length + 1;
      const newEntry = { ...newEquipment, id: newId };
      setEquipments([...equipments, newEntry]);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setCurrentEquipment({ ...currentEquipment, [name]: value });
    } else {
      setNewEquipment({ ...newEquipment, [name]: value });
    }
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
            <th className={styles.th}>Nome/Ativo</th>
            <th className={styles.th}>Temp. Min</th>
            <th className={styles.th}>Temp. Máx</th>
            <th className={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((item) => (
            <tr key={item.id} className={styles.tr}>
              <td className={styles.td}>
                <div className={styles.circularButton}></div>
              </td>
              <td className={styles.td}>{item.equipamento}</td>
              <td className={styles.td}>{item.nomeAtivo}</td>
              <td className={styles.td}>{item.tempMin}</td>
              <td className={styles.td}>{item.tempMax}</td>
              <td className={styles.td}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleEdit(item)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleDelete(item.id)}
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
            <input
              type="text"
              name="equipamento"
              placeholder="Equipamento"
              value={
                isEditing ? currentEquipment.equipamento : newEquipment.equipamento
              }
              onChange={handleChange}
            />
            <input
              type="text"
              name="nomeAtivo"
              placeholder="Nome/Ativo"
              value={isEditing ? currentEquipment.nomeAtivo : newEquipment.nomeAtivo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tempMin"
              placeholder="Temp. Min"
              value={isEditing ? currentEquipment.tempMin : newEquipment.tempMin}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tempMax"
              placeholder="Temp. Máx"
              value={isEditing ? currentEquipment.tempMax : newEquipment.tempMax}
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
