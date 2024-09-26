import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import styles from './CamarasEAtivos.css';
//import camarasAtivosDados from './CamarasEAtivosDados';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle, faCheckSquare, faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons';
import GoogleChart from '../GoogleChart/GoogleChart';

const CamarasEAtivos = () => {
  const [equipamentos, setEquipamentos] = useState([]); // Inicializa o estado com um array vazio
  const [equipamentosSelecionados,  setEquipamentosSelecionados] = useState([]); //Estado para os equipamentos selecionados
  const [cliId, setCliId] = useState(null); // Estado para armazenar o cli_id

  //Estados para armazenar Temperatura e Umidade
  const [dadosTemperatura, setDadosTemperatura] = useState({});
  const [dadosUmidade, setDadosUmidade] = useState({});

  //!Função para buscar os dados de Temperatura e Umidade
  const buscarDados = async (equip_id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/equipamento/dadosUltimaComunicacao/${equip_id}`);
      if (response.data.sucesso) {
        const dados = response.data.dados[0]; // Acessa o primeiro item do array de dados

        //Atualiza os estados de temperatura e umidade com base no equipId
        setDadosTemperatura(prevState => ({ ...prevState, [equip_id]: dados.dados_temp}));
        setDadosUmidade(prevState => ({ ...prevState, [equip_id]: dados.dados_umid}));
      } else {
        console.error('Erro ao buscar os dados da ultima comunicação com o equipamento:', response.data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados de temperatura e umidade:', error);
    }
  };

  //!Função para buscar dados da API 'dadosEquipamentoEmpresa', trazendo o nome da camara e o modelo do equipamento
  const fetchEquipamentoDados = async (cliId) => {
    try {
      if (!cliId) {
        console.error('cli_id não encontrado.');
        return;
      }
      
      const response = await axios.get(`http://127.0.0.1:3333/equipamento/dadosEquipamentoEmpresa/${cliId}`); // Faz a requisição GET
      if (response.data.sucesso) {
        // Adicionando a propriedade 'selecionado' para cada equipamento
        const dadosComSelecao = response.data.dados.map(item => ({
          ...item,
          selecionado: true // Por padrão, todos estarão selecionados
        }));
        setEquipamentos(dadosComSelecao); // Armazena os dados mais recentes da API com o estado 'selecionado'
        setEquipamentosSelecionados(dadosComSelecao.map(item => item.equip_nome)); // Inicializa os selecionados

        //Para cada equipamento - buscar os dados de temperatura e umidade da ultima comunicação
        dadosComSelecao.forEach(item => buscarDados(item.equip_id));
      } else {
        console.error(response.data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  
  //useEffect para buscar o cli_id do localStorage e carregar os dados
  useEffect(() => {
    //Função para buscar o cli_id do localStorage
    const storedCliId = localStorage.getItem('cli_id');
  
    if (storedCliId) {
      setCliId(storedCliId);
      fetchEquipamentoDados(storedCliId); //Faz a requisição quando o cli_id estiver disponível
    } else {
      console.error('cli_id não encontrado no localStorage');
    }
  }, []);
  
  useEffect(() => {
    if (cliId) {
      const interval = setInterval(() => {
        fetchEquipamentoDados(cliId); //Faz a requisição a cada 1 minuto com o cli_id correto
      }, 60000);
  
      return () => clearInterval(interval);
    }
  }, [cliId]); //A função só será executada quando o cliId estiver disponível
  
  

  //Função para manipular a mudança das checkboxes
  const handleCheckboxChange = (equipNome) => {
    setEquipamentos(prevState =>
      prevState.map(item =>
        item.equip_nome === equipNome
          ? { ...item, selecionado: !item.selecionado } //Altera o estado de selecionado
          : item
      )
    );

    //Atualiza a lista de equipamentos selecionados
    setEquipamentosSelecionados(prevSelecionados => {
      if (prevSelecionados.includes(equipNome)) {
        return prevSelecionados.filter(nome => nome !== equipNome); //Remove da lista de desmarcado
      } else {
        return [...prevSelecionados, equipNome]; //Adciona a lista se marcado
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
                      onChange={() => handleCheckboxChange(item.equip_nome)} // Manipulador de eventos para a checkbox
                    />
                  </td>
                  <td>{item.local_nome}</td>
                  <td>{item.equip_modelo}</td>
                  <td className={item.alerta ? 'alertaTempErro' : 'alertaTempNormal'}>
                    {dadosTemperatura[item.equip_id] || 'N/A'}C°
                  </td>
                  <td className='tdCentro'>
                    {dadosUmidade[item.equip_id] || 'N/A'}%
                  </td>
                  <td className='tdCentro'>
                    {item.alerta ? (
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
            {/* Passa os equipamentos selecionados para o componente GoogleChart */}
            {/* <GoogleChart equipamentosSelecionados={equipamentosSelecionados} /> */}
    </div>
  );
};

export default CamarasEAtivos;
