import React, { useState, useEffect } from 'react';
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


  //Conexão com API
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3333/equipamento');
        const data = await response.json();
        console.log(data); // Verifique o conteúdo da resposta aqui
        setDados(data.dados);
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
              {camarasAtivosDados.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox" 
                      checked={selecionados[item.ativo]}
                      onChange={() => handleCheckboxChange(item.ativo)}
                    />
                  </td>
                  <td>{item.equip_nome}</td>
                  <td>{item.ativo}</td>
                  <td className={item.alerta ? 'alertaTempErro' : 'alertaTempNormal'}>{item.tempInterna}</td>
                  <td className='tdCentro'>{item.umidade}</td>
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
