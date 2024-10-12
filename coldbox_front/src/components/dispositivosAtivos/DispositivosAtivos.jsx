import React, { useEffect, useState } from 'react';
import styles from './DispositivosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen, faCircle  } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import dispositivosFicticios from './dispositivosFicticios';



const DispositivosAtivos = () => {
  // const [dispositivos, setDispositivos] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    status: 'offline',
    local_nome: '',
    equip_modelo: '',
    equip_tipo: '',
    equip_ip: '',
    equip_mac: '',
    equip_observacao: '',
  });

  useEffect(() => {
    const cli_id = localStorage.getItem('cli_id'); //Pegando o cli_id do local storage

    if(cli_id) {
      axios.get(`http://127.0.0.1:3333/equipamento/${cli_id}`)
        .then(response => {
          setDispositivos(response.data.dados);
        })
        .catch(error => {
          console.error('Erro ao buscar os dispositivos', error);
        });
      } else {
        console.error('Cli_id não encontrado.')
      }
    }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice((prev) => ({ ...prev, [name]: value }));
  };

  const addDispositivo = () => {
    setDispositivos((prevDispositivos) => [...prevDispositivos, newDevice]);
    setShowModal(false);
    setNewDevice({
      status: 'offline', 
      local_nome: '',
      equip_modelo: '',
      equip_tipo: '',
      equip_ip: '',
      equip_mac: '',
      equip_observacao: '',
    });
  };

  const deleteDispositivo = (index) => {
    const updatedDispositivos = [...dispositivos];
    updatedDispositivos.splice(index, 1);
    setDispositivos(updatedDispositivos);
  };

  return (
    <div className={styles.conteinerGrid}>
      <div className={styles.headerDispositivos}>
        <span className={styles.tag}>Dispositivos Ativos</span>
        <button
          className={styles.addButton}
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Adicionar Dispositivo
        </button>
      </div>
      <div className={styles.tabelaGeral}>
        <table className={styles.tabelaDispositivos}>
          <thead>
            <tr>
              <th className={styles.th}>Status</th> {/* Indicador de status */}
              <th className={styles.th}>Equipamento</th> {/* local_nome */}
              <th className={styles.th}>Modelo</th> {/* equip_modelo */}
              <th className={styles.th}>Sensor</th> {/* equip_tipo */}
              <th className={styles.th}>IP</th> {/* equip_ip */}
              <th className={styles.th}>MAC</th> {/* equip_mac */}
              <th className={styles.th}>Descrição</th> {/* equip_observacao */}
            </tr>
          </thead>
          <tbody>
            {dispositivos.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={styles.td}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={item.status === 'A' ? styles.online : styles.offline}
                  />
                </td>
                <td className={styles.td}>{item.local_nome}</td>
                <td className={styles.td}>{item.equip_modelo}</td>
                <td className={styles.td}>{item.equip_tipo}</td>
                <td className={styles.td}>{item.equip_ip}</td>
                <td className={styles.td}>{item.equip_mac}</td>
                <td className={styles.td}>{item.equip_observacao || 'Sem observação'}</td>
                <td className={styles.td}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={styles.editIcon}
                    onClick={() => console.log('Editar dispositivo', index)}
                  />
                  {/* <FontAwesomeIcon
                    icon={faTrash}
                    className={styles.deleteIcon}
                    onClick={() => deleteDispositivo(index)}
                  /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalDispositivos}>
          <div className={styles.modalContent}>
            <h2>Adicionar Novo Dispositivo</h2>
      
            <label htmlFor="nome do equipamento">Equipamento</label>
            <input
              type="text"
              name="local_nome"
              id="local_nome"
              value={newDevice.local_nome}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="equip_modelo">Modelo</label>
            <input
              type="text"
              name="equip_modelo"
              id="equip_modelo"
              value={newDevice.equip_modelo}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="equip_tipo">Sensor</label>
            <input
              type="text"
              name="equip_tipo"
              id="equip_tipo"
              value={newDevice.equip_tipo}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="equip_ip">IP</label>
            <input
              type="text"
              name="equip_ip"
              id="equip_ip"
              value={newDevice.equip_ip}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="equip_mac">MAC</label>
            <input
              type="text"
              name="equip_mac"
              id="equip_mac"
              value={newDevice.equip_mac}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="equip_observacao">Descrição</label>
            <textarea
              name="equip_observacao"
              id="equip_observacao"
              value={newDevice.equip_observacao}
              onChange={handleInputChange}
            />

            <div className={styles.modalAddDispositivo}>
              <button type="fecharModal" onClick={() => setShowModal(false)}>Fechar</button>
              <button type="adicionarDisp" onClick={addDispositivo}>Adicionar</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default DispositivosAtivos;
