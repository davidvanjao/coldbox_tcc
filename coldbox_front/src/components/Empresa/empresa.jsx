import React, { useEffect, useState } from 'react';
import styles from './empresa.css';
import axios from 'axios';

const Empresa = () => {
  
  

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerSecundario}>
        <span className={styles.tag}>Empresa</span>

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
            {(() => (
              <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td className={`${styles.td} ${styles.statusDispositivos}`}>

                </td>
                <td className={styles.td}>{item.local_nome}</td>
                <td className={styles.td}>{item.equip_modelo}</td>
                <td className={styles.td}>{item.equip_tipo}</td>
                <td className={styles.td}>{item.equip_ip}</td>
                <td className={styles.td}>{item.equip_mac}</td>
                <td className={styles.td}>{item.equip_observacao || 'Sem observação'}</td>
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
