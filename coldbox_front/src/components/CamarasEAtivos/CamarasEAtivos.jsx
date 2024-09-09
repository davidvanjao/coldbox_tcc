import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa a biblioteca axios
import styles from './CamarasEAtivos.css';
import camarasAtivosDados from './CamarasEAtivosDados';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons';
import GoogleChart from '../GoogleChart/GoogleChart';

const CamarasEAtivos = () => {
  const [selecionados, setSelecionados] = useState({
    Principal: true,
    Frios: true,
    Bebidas: true,
    Congelados: true,
  });

  //CheckBox
  const handleCheckboxChange = (ativo) => {
    setSelecionados(prevState => ({
      ...prevState,
      [ativo]: !prevState[ativo]
    }));
  };

  const [dados, setDados] = useState([]); // Inicializa o estado com um array vazio

  // Função para buscar dados da API usando axios
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3333/equipamento'); // Faz a requisição GET
        if (response.data.sucesso) {
          setDados(response.data.dados); // Armazena os dados da API no estado
        } else {
          console.error(response.data.mensagem);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchDados();
  }, []);

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
                <th>Ativo</th>
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
            {dados.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox" 
                      checked={selecionados[item.ativo]}
                      onChange={() => handleCheckboxChange(item.ativo)}
                    />
                  </td>
                  <td>{item.equip_nome}</td>
                  <td>{item.equip_modelo}</td>
                  <td className={item.alerta ? 'alertaTempErro' : 'alertaTempNormal'}>{item.dados_temp}</td>
                  <td className='tdCentro'>{item.dados_umid}</td>
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
    </div>
  );
};

export default CamarasEAtivos;
