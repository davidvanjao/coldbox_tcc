// src/components/dispositivosAtivos/DispositivosAtivos.jsx
import React, { useState } from 'react';
import styles from './usuario.module.css';
import usuariosDados from './usuario';

const Usuarios = () => {
  const [activeColor, setActiveColor] = useState({});

  const toggleColor = (id) => {
    setActiveColor((prevColors) => ({
      ...prevColors,
      [id]: prevColors[id] === 'green' ? 'red' : 'green',
    }));
  };

  return (
    <div className={styles.conteinerGrid}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Usuarios Cadastrados</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Equipamento</th>
              <th className={styles.th}>Nome/Ativo</th>
              <th className={styles.th}>Data da instalação</th>
            </tr>
          </thead>
          <tbody>
            {usuariosDados.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td className={styles.td}>
                  <div
                    className={`${styles.statusBall} ${styles[activeColor[item.id]]}`}
                    onClick={() => toggleColor(item.id)}
                  />
                </td>
                <td className={styles.td}>{item.id}</td>
                <td className={styles.td}>{item.equipamento}</td>
                <td className={styles.td}>{item.nomeAtivo}</td>
                <td className={styles.td}>{item.dataInstalacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
