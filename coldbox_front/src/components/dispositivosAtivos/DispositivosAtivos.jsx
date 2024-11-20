import React, { useEffect, useState } from 'react';
import styles from './DispositivosAtivos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const DispositivosAtivos = () => {
  const cliId = localStorage.getItem('cli_id') || ''; // Valor padrão caso esteja ausente
  const [dispositivos, setDispositivos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [novoDispositivo, setNovoDispositivo] = useState({
    equip_modelo: '',
    equip_tipo: '',
    equip_ip: '',
    equip_mac: '',
    equip_status: 'A', // Status padrão para novo dispositivo
    equip_observacao: '',
    cli_id: 1, // Valor padrão para cli_id (um dos três valores possíveis)
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    Listar();
  }, []);

  async function Listar() {
    try {
      const response = await axios.get('http://127.0.0.1:3333/equipamento/' + cliId);
      if (response.data.sucesso) {
        setDispositivos(response.data.dados);
      } else {
        setError('Erro ao listar dispositivos');
      }
    } catch (error) {
      setError('Erro ao listar dispositivos');
      console.error(error);
    }
  }

  // Lida com mudanças nos campos do formulário
  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setNovoDispositivo((prev) => ({ ...prev, [name]: value }));
  };

  // Cadastra um novo dispositivo
  const cadastrarDispositivo = async () => {
    try {
      console.log("Dispositivo a ser enviado:", novoDispositivo); // Verifique os dados antes do envio
      const response = await axios.post('http://127.0.0.1:3333/equipamento', novoDispositivo); 
      console.log("Resposta da API:", response); // Verifique a resposta da API
      if (response.data.sucesso) {
        setDispositivos((prev) => [...prev, response.data.dados]); // Adiciona o novo dispositivo à lista
        setNovoDispositivo({
          equip_modelo: '',
          equip_tipo: '',
          equip_ip: '',
          equip_mac: '',
          equip_status: 'A',
          equip_observacao: '',
          cli_id: 1, // Reinicia o cli_id para um valor padrão
        });
      } else {
        console.error("Erro na resposta:", response.data); // Se não tiver sucesso, mostre o erro
      }
    } catch (error) {
      setError('Erro ao adicionar dispositivo');
      console.error("Erro ao salvar dispositivo:", error); // Log de erro caso ocorra algum erro na requisição
    }
  };
  
  
  // Edita um dispositivo existente
  async function edtEquipamento() {
    try {
      const response = await axios.patch(`http://127.0.0.1:3333/equipamento/${equipamentoSelecionado}`, novoDispositivo);
      if (response.data.sucesso) {
        setDispositivos((prev) => 
          prev.map((item) =>
            item.equip_id === equipamentoSelecionado ? response.data.dados : item
          )
        );
        setMostrarModal(false);
        setNovoDispositivo({
          equip_modelo: '',
          equip_tipo: '',
          equip_ip: '',
          equip_mac: '',
          equip_status: 'A',
          equip_observacao: '',          
          cli_id: 1, // Reinicia o cli_id para um valor padrão
        });
        setEditando(false);
        setEquipamentoSelecionado(null);
      }
    } catch (error) {
      setError('Erro ao atualizar dispositivo');
      console.error(error);
    }
  }

  // Decide se o dispositivo será criado ou editado
  const salvarDispositivo = () => {
    if (editando) {
      edtEquipamento();
    } else {
      cadastrarDispositivo();
    }
  };

  // Prepara o modal para edição de um dispositivo
  const prepararEdicao = (dispositivo) => {
    setNovoDispositivo(dispositivo);
    setEquipamentoSelecionado(dispositivo.equip_id);
    setEditando(true);
    setMostrarModal(true);
  };

  // Limpa os dados do formulário e reseta os estados
  const limparFormulario = () => {
    setNovoDispositivo({
      equip_modelo: '',
      equip_tipo: '',
      equip_ip: '',
      equip_mac: '',
      equip_status: 'A',
      equip_observacao: '',
      cli_id: 1, // Reinicia o cli_id para um valor padrão
    });
    setEditando(false);
    setEquipamentoSelecionado(null);
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerSecundario}>
        <span className={styles.tag}>Dispositivos Ativos</span>
        <button
          className={styles.botaoAddDisp}
          onClick={() => {
            limparFormulario();
            setMostrarModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Adicionar Dispositivo
        </button>
      </div>

      <div className={styles.tabelaGeral}>
        <table className={styles.tabelaDispositivos}>
          <thead>
            <tr>
              <th className={`${styles.td} ${styles.statusDispositivos}`}>Status</th>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Modelo</th>
              <th className={styles.th}>Tipo do Sensor</th>
              <th className={styles.th}>IP</th>
              <th className={styles.th}>MAC</th>
              <th className={styles.th}>Descrição</th>
              <th className={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dispositivos.map((item) => (
              <tr
                key={item.equip_id}
                className={styles[item.equip_status === 'A' ? 'evenRow' : 'oddRow']}
              >
                <td className={`${styles.td} ${styles.statusDispositivos}`}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={item.equip_status === 'A' ? styles.online : styles.offline}
                  />
                </td>
                <td className={styles.td}>{item.local_nome || 'N/A'}</td>
                <td className={styles.td}>{item.equip_modelo}</td>
                <td className={styles.td}>{item.equip_tipo}</td>
                <td className={styles.td}>{item.equip_ip}</td>
                <td className={styles.td}>{item.equip_mac}</td>
                <td className={styles.td}>{item.equip_observacao || 'Sem observação'}</td>
                <td className={styles.td}>
                  <FontAwesomeIcon
                    icon={faPen}
                    className={styles.editarDispositivo}
                    onClick={() => prepararEdicao(item)}
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
            <h2>{editando ? 'Editar Dispositivo' : 'Adicionar Novo Dispositivo'}</h2>
            <form>
              <label htmlFor="equip_modelo">Modelo</label>
              <input
                type="text"
                name="equip_modelo"
                id="equip_modelo"
                value={novoDispositivo.equip_modelo}
                onChange={lidarComMudanca}
                required
              />

              <label htmlFor="equip_tipo">Tipo do Sensor</label>
              <input
                type="text"
                name="equip_tipo"
                id="equip_tipo"
                value={novoDispositivo.equip_tipo}
                onChange={lidarComMudanca}
                required
              />

              <label htmlFor="equip_ip">IP</label>
              <input
                type="text"
                name="equip_ip"
                id="equip_ip"
                value={novoDispositivo.equip_ip}
                onChange={lidarComMudanca}
                required
              />

              <label htmlFor="equip_mac">MAC</label>
              <input
                type="text"
                name="equip_mac"
                id="equip_mac"
                value={novoDispositivo.equip_mac}
                onChange={lidarComMudanca}
                required
              />

              <label htmlFor="cli_id">Cliente</label>
              <select
                name="cli_id"
                id="cli_id"
                value={novoDispositivo.cli_id}
                onChange={lidarComMudanca}
                required
              >
                <option value={1}>Cliente 1</option>
                <option value={2}>Cliente 2</option>
                <option value={3}>Cliente 3</option>
              </select>

              <label htmlFor="equip_observacao">Observação</label>
              <textarea
                name="equip_observacao"
                id="equip_observacao"
                value={novoDispositivo.equip_observacao}
                onChange={lidarComMudanca}
              />

              <button
                type="button"
                onClick={salvarDispositivo}
              >
                {editando ? 'Salvar Alterações' : 'Adicionar Dispositivo'}
              </button>
              <button
                type="button"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispositivosAtivos;
