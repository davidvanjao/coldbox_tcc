import React, { useEffect, useState } from 'react';
import styles from './empresa.css';
import axios from 'axios';

const Empresa = () => {
    const [dispositivos, setDispositivos] = useState([]);

  
  
    //Carrega os dispositivos já cadastrados com base no cli_id do localStorage
    useEffect(() => {
      const cli_id = localStorage.getItem('cli_id'); //Pega o cli_id do localStorage
  
      if (cli_id) {
        axios
          .get(`http://127.0.0.1:3333/cliente/${cli_id}`)
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
  

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerSecundario}>
        <span className={styles.tag}>Dispositivos Ativos</span>

      </div>
      <div className={styles.tabelaGeral}>
        <table className={styles.tabelaDispositivos}>
          <thead>
            <tr>
              <th className={`${styles.td} ${styles.statusDispositivos}`}>Status</th> {/* Indicador de status */}
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Modelo</th> {/* equip_modelo */}
              <th className={styles.th}>Tipo do Sensor</th> {/* equip_tipo */}
              <th className={styles.th}>IP</th> {/* equip_ip */}
              <th className={styles.th}>MAC</th> {/* equip_mac */}
              <th className={styles.th}>Descrição</th> {/* equip_observacao */}
            </tr>
          </thead>
          <tbody>
            {dispositivos.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={`${styles.td} ${styles.statusDispositivos}`}>

                </td>
                <td className={styles.td}>{item.cli_razaoSocial}</td>
                <td className={styles.td}>{item.cli_endereco}</td>
                <td className={styles.td}>{item.cli_cidade}</td>
                <td className={styles.td}>{item.cli_estado}</td>
                <td className={styles.td}>{item.cli_contrato}</td>
                <td className={styles.td}>{item.cli_data || 'Sem observação'}</td>
                <td className={styles.td}>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Empresa;
