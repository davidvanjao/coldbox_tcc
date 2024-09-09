import React, { useState } from 'react';
import styles from './DispositivosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const DispositivosAtivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    nomeDispositivo: '',
    nomeCamara: '',
    dataInstalacao: '',
    modelo: '',       // Novo campo "Modelo"
    observacao: '',    // Novo campo "Observação"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice((prev) => ({ ...prev, [name]: value }));
  };

  const addDispositivo = () => {
    setDispositivos((prevDispositivos) => [...prevDispositivos, newDevice]);
    setShowModal(false);
    setNewDevice({
      nomeDispositivo: '',
      nomeCamara: '',
      dataInstalacao: '',
      modelo: '',
      observacao: '',
    });
  };

  const deleteDispositivo = (index) => {
    const updatedDispositivos = [...dispositivos];
    updatedDispositivos.splice(index, 1);
    setDispositivos(updatedDispositivos);
  };

  return (
    <div className={styles.conteinerGrid}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>Dispositivos Ativos</span>
          <button
            className={styles.addButton}
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Adicionar Dispositivo
          </button>
        </div>
        <div className={styles.tabelaGeral}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Nome do Dispositivo</th>
                <th className={styles.th}>Câmara</th>
                <th className={styles.th}>Data de Instalação</th>
                <th className={styles.th}>Modelo</th>      {/* Coluna para "Modelo" */}
                <th className={styles.th}>Observação</th>  {/* Coluna para "Observação" */}
                <th className={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dispositivos.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                >
                  <td className={styles.td}>{item.nomeDispositivo}</td>
                  <td className={styles.td}>{item.nomeCamara}</td>
                  <td className={styles.td}>{item.dataInstalacao}</td>
                  <td className={styles.td}>{item.modelo}</td>          {/* Valor "Modelo" */}
                  <td className={styles.td}>{item.observacao}</td>      {/* Valor "Observação" */}
                  <td className={styles.td}>
                    <FontAwesomeIcon
                      icon={faPen}
                      className={styles.editIcon}
                      onClick={() => console.log('Editar dispositivo', index)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.deleteIcon}
                      onClick={() => deleteDispositivo(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Adicionar Novo Dispositivo</h2>
            <label htmlFor="nomeDispositivo">Nome do Dispositivo</label>
            <input
              type="text"
              name="nomeDispositivo"
              id="nomeDispositivo"
              value={newDevice.nomeDispositivo}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="nomeCamara">Nome da Câmara</label>
            <input
              type="text"
              name="nomeCamara"
              id="nomeCamara"
              value={newDevice.nomeCamara}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="dataInstalacao">Data de Instalação</label>
            <input
              type="date"
              name="dataInstalacao"
              id="dataInstalacao"
              value={newDevice.dataInstalacao}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="modelo">Modelo</label> {/* Campo "Modelo" */}
            <input
              type="text"
              name="modelo"
              id="modelo"
              value={newDevice.modelo}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="observacao">Observação</label> {/* Campo "Observação" */}
            <textarea
              name="observacao"
              id="observacao"
              value={newDevice.observacao}
              onChange={handleInputChange}
              rows="3"
              required
            />

            <div className={styles.modalActions}>
              <button onClick={addDispositivo}>Adicionar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispositivosAtivos;
