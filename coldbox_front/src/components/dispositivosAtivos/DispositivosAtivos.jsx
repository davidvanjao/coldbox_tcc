// src/components/dispositivosAtivos/DispositivosAtivos.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './DispositivosAtivos.module.css';

const DispositivosAtivos = () => {
  const [activeColor, setActiveColor] = useState({});
  const [dispositivos, setDispositivos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    equipamento: '',
    nomeAtivo: '',
    dataInstalacao: '',
  });

  const toggleColor = (id) => {
    setActiveColor((prevColors) => ({
      ...prevColors,
      [id]: prevColors[id] === 'green' ? 'red' : 'green',
    }));
  };

  const handleAddDispositivo = () => {
    setDispositivos([...dispositivos, { ...formData, id: dispositivos.length + 1 }]);
    setFormData({ equipamento: '', nomeAtivo: '', dataInstalacao: '' });
  };

  const handleEditDispositivo = (index) => {
    setEditIndex(index);
    setFormData(dispositivos[index]);
  };

  const handleSaveEdit = () => {
    const updatedDispositivos = [...dispositivos];
    updatedDispositivos[editIndex] = formData;
    setDispositivos(updatedDispositivos);
    setEditIndex(null);
    setFormData({ equipamento: '', nomeAtivo: '', dataInstalacao: '' });
  };

  const handleDeleteDispositivo = (index) => {
    const updatedDispositivos = dispositivos.filter((_, i) => i !== index);
    setDispositivos(updatedDispositivos);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.conteinerGrid}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>Dispositivos Ativos</span>
        </div>

        {/* Formulário para adicionar dispositivos */}
        <div className={styles.form}>
          <input
            type="text"
            name="equipamento"
            placeholder="Nome do Equipamento"
            value={formData.equipamento}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="nomeAtivo"
            placeholder="Tipo de Câmara"
            value={formData.nomeAtivo}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="date"
            name="dataInstalacao"
            value={formData.dataInstalacao}
            onChange={handleChange}
            className={styles.input}
          />
          <button onClick={editIndex !== null ? handleSaveEdit : handleAddDispositivo} className={styles.addButton}>
            {editIndex !== null ? 'Salvar Alterações' : 'Adicionar Dispositivo'}
          </button>
        </div>

        <div className={styles.tabelaGeral}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Equipamento</th>
                <th className={styles.th}>Nome/Ativo</th>
                <th className={styles.th}>Data da instalação</th>
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dispositivos.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td className={styles.td}>
                    <div
                      className={`${styles.statusBall} ${styles[activeColor[item.id]]}`}
                      onClick={() => toggleColor(item.id)}
                    />
                  </td>
                  <td className={styles.td}>{item.id}</td>
                  <td className={styles.td}>{item.equipamento}</td>
                  <td className={styles.td}>{item.nomeAtivo}</td>
                  <td className={styles.td}>{item.dataInstalacao}</td>
                  <td className={styles.td}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={styles.editIcon}
                      onClick={() => handleEditDispositivo(index)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.deleteIcon}
                      onClick={() => handleDeleteDispositivo(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DispositivosAtivos;

