import Link from 'next/link';
import styles from './barra.css';

export default function BarraSuperior() {
  return (
    <div className='barraSuperior'>
        <div className='nomeEmpresa'>
            <h1>Supermercado Gaspar</h1>
                <div className='tagsInformacao'>
                    <span className='tag'>Ambiente Refrigerado</span>
                    <span className='tag'>MEGA2560</span>
                    <span className='tag'>ESP8266</span>
                </div>
                <p>Atualizado agora mesmo</p>
        </div>









    </div>
  );
}
//  <div className="top-bar">
//   <div className="company-name">
//     <h1>Super. Gaspar</h1>
//     <div className="info-tags">
//       <span className="tag">Ambiente Refrigerado</span>
//       <span className="tag">MEGA2560</span>
//       <span className="tag">ESP8266</span>
//     </div>
//     <p>Atualizado agora mesmo</p>
//   </div>
//   <div className="user-profile">
//     <div className="user-info">
//       <img src="/path-to-user-image" alt="User" />
//       <div>
//         <h3>Pedro Lima</h3>
//         <span>Administrador</span>
//       </div>
//     </div>
//     <button className="settings-button">
//       <img src="/path-to-settings-icon.png" alt="Settings" />
//     </button>
//   </div>
// </div>