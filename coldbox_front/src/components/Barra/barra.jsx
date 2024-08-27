import Link from 'next/link';
import styles from './barra.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

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
        <div className='perfilUsuario'>
          <div className='informacaoUsuario'>
            <img src="/user.png" alt="Usuario" />
            <div>
              <h3>Pedro Lima</h3>
              <span>Administrador</span>
            </div>
          </div>
          <button className='botaoConfiguracao'>
            <FontAwesomeIcon icon={faGear} className='iconeConfig'/>
          </button>
        </div>




    </div>
  );
}
