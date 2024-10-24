import React, { useEffect, useState } from 'react';
import styles from './DispositivosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const DispositivosAtivos = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [novoDispositivo, setNovoDispositivo] = useState({
    modeloEquipamento: '',
    tipoSensor: '',
    ipEquipamento: '',
    macEquipamento: '',
    observacaoEquipamento: '',
    localNome: '',
    localDescricao: ''
  });


  //Carrega os dispositivos já cadastrados com base no cli_id do localStorage
  useEffect(() => {
    const cli_id = localStorage.getItem('cli_id'); // Pega o cli_id do localStorage

    if (cli_id) {
      axios
        .get(`http://127.0.0.1:3333/equipamento/${cli_id}`)
        .then((response) => {
          setDispositivos(response.data.dados);
        })
        .catch((error) => {
          console.error('Erro ao buscar os dispositivos', error);
        });
    } else {
      console.error('Cli_id não encontrado.');
    }
  }, []);

  //Lida com as mudanças nos campos de input do modal
  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setNovoDispositivo((prev) => ({ ...prev, [name]: value }));
  };

  // Função para salvar o dispositivo (criar ou editar)
  const salvarDispositivo = () => {
    const cli_id = localStorage.getItem('cli_id');

    if (editando) {
      axios
        .patch(`http://127.0.0.1:3333/equipamento/${equipamentoSelecionado}`, {
          equip_modelo: novoDispositivo.modeloEquipamento,
          equip_tipo: novoDispositivo.tipoSensor,
          equip_ip: novoDispositivo.ipEquipamento,
          equip_mac: novoDispositivo.macEquipamento,
          equip_status: 'A',
          equip_observacao: novoDispositivo.observacaoEquipamento || null,
        })
        .then((response) => {
          const novosDispositivos = dispositivos.map((dispositivo) =>
            dispositivo.equip_id === equipamentoSelecionado ? { ...dispositivo, ...response.data.dados } : dispositivo
          );
          setDispositivos(novosDispositivos);
          setMostrarModal(false);
          setNovoDispositivo({
            modeloEquipamento: '',
            tipoSensor: '',
            ipEquipamento: '',
            macEquipamento: '',
            observacaoEquipamento: '',
          });
          setEditando(false);
          setEquipamentoSelecionado(null);
        })
        .catch((error) => {
          console.error('Erro ao editar o dispositivo', error);
        });
    } else {
      axios
        .post('http://127.0.0.1:3333/equipamento/cadastrarEquipComLocal', {
          equip_modelo: novoDispositivo.modeloEquipamento,
          equip_tipo: novoDispositivo.tipoSensor,
          equip_ip: novoDispositivo.ipEquipamento,
          equip_mac: novoDispositivo.macEquipamento,
          equip_status: 'A',
          equip_observacao: novoDispositivo.observacaoEquipamento || null,
          local_nome: novoDispositivo.localNome,
          local_descricao: novoDispositivo.localDescricao,
          cli_id: cli_id,
        })
        .then((response) => {
          setDispositivos([...dispositivos, response.data.dados]);
          setMostrarModal(false);
          setNovoDispositivo({
            modeloEquipamento: '',
            tipoSensor: '',
            ipEquipamento: '',
            macEquipamento: '',
            observacaoEquipamento: '',
            localNome: '',
            localDescricao: ''
          });
        })
        .catch((error) => {
          console.error('Erro ao adicionar o dispositivo', error);
        });
    }
  };

  const editarDispositivo = (dispositivo) => {
    setNovoDispositivo({
      modeloEquipamento: dispositivo.equip_modelo,
      tipoSensor: dispositivo.equip_tipo,
      ipEquipamento: dispositivo.equip_ip,
      macEquipamento: dispositivo.equip_mac,
      observacaoEquipamento: dispositivo.equip_observacao,
      localNome: dispositivo.local_nome,
      localDescricao: dispositivo.local_descricao,
    });
    setEquipamentoSelecionado(dispositivo.equip_id);
    setEditando(true);
    setMostrarModal(true);
  };

  return (
    <div className={styles.conteinerGrid}>
      <div className={styles.headerDispositivos}>
        <span className={styles.tag}>Dispositivos Ativos</span>
        <button
          className={styles.addButton}
          onClick={() => setMostrarModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Adicionar Dispositivo
        </button>
      </div>
      <div className={styles.tabelaGeral}>
        <table className={styles.tabelaDispositivos}>
          <thead>
            <tr>
              <th className={styles.th}>Status</th> {/* Indicador de status */}
              <th className={styles.th}>Equipamento</th> {/* equip_modelo */}
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
                    className={item.equip_status === 'A' ? styles.online : styles.offline}
                  />
                </td>
                <td className={styles.td}>{item.equip_modelo}</td>
                <td className={styles.td}>{item.equip_tipo}</td>
                <td className={styles.td}>{item.equip_ip}</td>
                <td className={styles.td}>{item.equip_mac}</td>
                <td className={styles.td}>{item.equip_observacao || 'Sem observação'}</td>
                <td className={styles.td}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={styles.editIcon}
                    onClick={() => editarDispositivo(item)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div className={styles.modalDispositivos}>
          <div className={styles.modalContent}>
            <h2>Adicionar Novo Dispositivo</h2>
      
            <label htmlFor="modeloEquipamento">Modelo</label>
            <input
              type="text"
              name="modeloEquipamento"
              id="modeloEquipamento"
              value={novoDispositivo.modeloEquipamento}
              onChange={lidarComMudanca}
              required
            />

            <label htmlFor="tipoSensor">Sensor</label>
            <input
              type="text"
              name="tipoSensor"
              id="tipoSensor"
              value={novoDispositivo.tipoSensor}
              onChange={lidarComMudanca}
              required
            />

            <label htmlFor="ipEquipamento">IP</label>
            <input
              type="text"
              name="ipEquipamento"
              id="ipEquipamento"
              value={novoDispositivo.ipEquipamento}
              onChange={lidarComMudanca}
              required
            />

            <label htmlFor="macEquipamento">MAC</label>
            <input
              type="text"
              name="macEquipamento"
              id="macEquipamento"
              value={novoDispositivo.macEquipamento}
              onChange={lidarComMudanca}
              required
            />

            <label htmlFor="observacaoEquipamento">Descrição</label>
            <input
              name="observacaoEquipamento"
              id="observacaoEquipamento"
              value={novoDispositivo.observacaoEquipamento}
              onChange={lidarComMudanca}
            />

            <label htmlFor="localNome">Nome da Localização</label>
            <input
              type="text"
              name="localNome"
              id="localNome"
              value={novoDispositivo.localNome}
              onChange={lidarComMudanca}
              required
            />

            <label htmlFor="localDescricao">Descrição da Localização</label>
            <input
              type="text"
              name="localDescricao"
              id="localDescricao"
              value={novoDispositivo.localDescricao}
              onChange={lidarComMudanca}
              required
            />

            <div className={styles.modalAddDispositivo}>
              <button type="fecharModal" onClick={() => setMostrarModal(false)}>Fechar</button>
              <button type="adicionarDisp" onClick={salvarDispositivo}>
                {editando ? 'Salvar Alterações' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispositivosAtivos;
