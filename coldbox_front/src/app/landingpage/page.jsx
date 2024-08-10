import styles from './page.css'
import Image from 'next/image';


export default function LandingPage() {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <a href="#" className="link">Início</a>
          <a href="#" className="link">Soluções</a>
          <a href="#" className="link">Recursos</a>
          <a href="#" className="link">Aplicativo</a>
          <a href="#" className="link">SAC</a>
          <button className="loginButton">Login</button>
        </nav>
      </header>

      <div className="imagemFundo">
          <div className="textoSobreImagem">
            <h2 className='negrito'>Garanta sua <span class="degrade">Eficiência <br />Operacional</span> e <br /> monitore em tempo <br />real a temperatura de <br />seus equipamentos</h2>
            <p> Fale com um de nossos consultores <br />e agende uma Visita Técnica</p>
          <button className="ctaButton">TENHO INTERESSE</button>
        </div>     
      </div>
      
    </>
  );
}