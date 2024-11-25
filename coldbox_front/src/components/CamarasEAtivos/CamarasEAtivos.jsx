import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from './CamarasEAtivos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle, faCheckSquare, faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons';

const CamarasEAtivos = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamentosSelecionados, setEquipamentosSelecionados] = useState([]);
  const [cliId, setCliId] = useState(null);

  // Estados para armazenar Temperatura, Umidade e Alertas Ativos
  const [dadosTemperatura, setDadosTemperatura] = useState({});
  const [dadosUmidade, setDadosUmidade] = useState({});
  const [alertasAtivos, setAlertasAtivos] = useState({});

  //! Função para buscar alertas ativos e não visualizados usando a API existente
  const fetchAlertasAtivos = async () => {
    try {
      if (!cliId) return;

      const responseEquipamentos = await axios.get(`http://127.0.0.1:3333/equipamento/${cliId}`);
      if (!responseEquipamentos.data.sucesso) {
        console.error('Erro ao buscar equipamentos:', responseEquipamentos.data.mensagem);
        return;
      }

      const equipIds = responseEquipamentos.data.dados.map(equip => equip.equip_id);
      const alertas = {};

      // Para cada equipamento, busque os alertas não visualizados
      for (const equipId of equipIds) {
        const response = await axios.get(`http://127.0.0.1:3333/logs/listarNotificacoesNaoVisualizadasWEB/${equipId}`);
        if (response.data.sucesso && response.data.dados.length > 0) {
          alertas[equipId] = true; // Marca o equipamento com alerta ativo
        }
      }

      setAlertasAtivos(alertas);
    } catch (error) {
      console.error('Erro ao buscar alertas ativos:', error);
    }
  };

  //! Função para buscar os dados de Temperatura e Umidade
  const buscarDados = async (equip_id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/equipamento/dadosUltimaComunicacao/${equip_id}`);
      if (response.data.sucesso) {
        const dados = response.data.dados[0];
        if (dados) {
          const temperatura = dados.dados_temp !== undefined ? dados.dados_temp : 'N/A';
          const umidade = dados.dados_umid !== undefined ? dados.dados_umid : 'N/A';

          setDadosTemperatura(prevState => ({ ...prevState, [equip_id]: temperatura }));
          setDadosUmidade(prevState => ({ ...prevState, [equip_id]: umidade }));
        } else {
          console.error('Nenhum dado encontrado para o equipamento:', equip_id);
        }
      } else {
        console.error('Erro ao buscar os dados da última comunicação com o equipamento:', response.data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados de temperatura e umidade:', error);
    }
  };

  //! Função para buscar dados da API 'dadosEquipamentoEmpresa'
  const fetchEquipamentoDados = async (cliId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/equipamento/dadosEquipamentoEmpresa/${cliId}`);
      if (response.data.sucesso) {
        const dadosComSelecao = response.data.dados.map(item => ({
          ...item,
          selecionado: true
        }));
        setEquipamentos(dadosComSelecao);
        setEquipamentosSelecionados(dadosComSelecao.map(item => item.equip_nome));
        dadosComSelecao.forEach(item => buscarDados(item.equip_id));
      } else {
        console.error(response.data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  //! useEffect para buscar o cli_id do localStorage e carregar os dados
  useEffect(() => {
    const storedCliId = localStorage.getItem('cli_id');
    if (storedCliId) {
      setCliId(storedCliId);
      fetchEquipamentoDados(storedCliId);
    } else {
      console.error('cli_id não encontrado no localStorage');
    }
  }, []);

  //! Atualiza os alertas ativos periodic0amente
  useEffect(() => {
    if (cliId) {
      fetchAlertasAtivos();
      const interval = setInterval(() => {
        fetchAlertasAtivos();
      }, 50);
      return () => clearInterval(interval);
    }
  }, [cliId]);

  //! Função para manipular a mudança das checkboxes
  const handleCheckboxChange = (equipNome) => {
    setEquipamentos(prevState =>
      prevState.map(item =>
        item.equip_nome === equipNome
          ? { ...item, selecionado: !item.selecionado }
          : item
      )
    );

    setEquipamentosSelecionados(prevSelecionados => {
      if (prevSelecionados.includes(equipNome)) {
        return prevSelecionados.filter(nome => nome !== equipNome);
      } else {
        return [...prevSelecionados, equipNome];
      }
    });
  };

  return (
    <div className='paiRetangulo'>
      <div className='painelInformacoes'>
        <div className='barraCamarasAtivos'>
          <span className='tag'>Câmaras e Ativos</span>
        </div>

        <div className="conteudoTabela">
          <table className="tabelaCamaras">
            <thead>
              <tr>
                <th className='thCentro'>
                  <FontAwesomeIcon icon={faCheckSquare} style={{ marginRight: '5px', fontSize: '2rem' }} />
                </th>
                <th>Equipamento</th>
                <th>Modelo</th>
                <th className='thCentro'>
                  <FontAwesomeIcon icon={faThermometerHalf} style={{ marginRight: '5px' }} />Temp. Interna
                </th>
                <th className='thCentro'>
                  <FontAwesomeIcon icon={faTint} style={{ marginRight: '5px' }} />Umidade
                </th>
                <th className='thCentro'>Alerta</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.selecionado}
                      onChange={() => handleCheckboxChange(item.equip_nome)}
                    />
                  </td>
                  <td>{item.local_nome}</td>
                  <td>{item.equip_modelo}</td>
                  <td className={alertasAtivos[item.equip_id] ? 'alertaTempErro' : 'alertaTempNormal'}>
                    {dadosTemperatura[item.equip_id] || 'N/A'}C°
                  </td>
                  <td className='tdCentro'>
                    {dadosUmidade[item.equip_id] || 'N/A'}%
                  </td>
                  <td className='tdCentro'>
                    {alertasAtivos[item.equip_id] ? (
                      <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'red' }} />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                    )}
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

export default CamarasEAtivos;
