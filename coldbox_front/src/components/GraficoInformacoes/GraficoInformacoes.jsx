import React from 'react';
import styles from './GraficoInformacoes.css';
import camarasAtivosDados from './camarasAtivosDados';


const GraficoInformacoes = () => {
  return (
    <div className='painelInformacoes'>
      <div className='barraCamarasAtivos'>
        <span className='tag'>Câmaras e Ativos</span>
      </div>
    

    <div className="tabelaCamaras">
    <table>
      <thead>
        <tr>
          <th>Equipamento</th>
          <th>Ativo</th>
          <th>Temp. Interna</th>
          <th>Umidade</th>
          <th>Alerta</th>
        </tr>
      </thead>  
      <tbody>
        {camarasAtivosDados.map((item, index) => (
          <tr key={index}>
            <td>{item.equipamento}</td>
            <td>{item.ativo}</td>
            <td className={item.alerta ? 'alertaTemp' : ''}>{item.tempInterna}</td>
            <td>{item.umidade}</td>
            <td>{item.alerta ? '⚠️' : '✔️'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>  
    </div>
  );
};

export default GraficoInformacoes;
