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

  //Função para buscar dados da API 'equipamento'
    const fetchEquipamentoDados  = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3333/equipamento'); //Faz a requisição GET
        if (response.data.sucesso) {
          //adcionando a propriedade 'selecionado' para cada equipamento
          const dadosComSelecao = response.data.dados.map(item => ({
            ...item,
            selecionado: true //Por padrãos todos estarão selecionados
          }))
          setEquipamentos(dadosComSelecao); //Armazena os dados mais recentes da API com o estado 'selecionado'
          setEquipamentosSelecionados(dadosComSelecao.map(item => item.equip_nome)); // Inicializa os selecionados
        } else {
          console.error(response.data.mensagem);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

  // Atualizar os dados a cada 1 minuto
  useEffect(() => {
    fetchEquipamentoDados(); // Carrega os dados inicialmente

    const interval = setInterval(() => {
      fetchEquipamentoDados(); // Faz a requisição a cada 1 minuto
    }, 6000); // 60000 ms = 1 minuto

    return () => clearInterval(interval); // Limpa o intervalo quando o componente não estiver sendo renderizado na tela
  }, []);

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
                  <td>{item.equip_nome}</td>
                  <td>{item.equip_modelo}</td>
                  <td className={item.alerta ? 'alertaTempErro' : 'alertaTempNormal'}>{item.dados_temp} C°</td>
                  <td className='tdCentro'>{item.dados_umid}%</td>
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
            <GoogleChart equipamentosSelecionados={equipamentosSelecionados} />
    </div>
  );
};

export default CamarasEAtivos;
