import styles from './page.css'
import Image from 'next/image';


export default function LandingPage() {
  return (
    <>
      <div className='container'>
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

      <div className='secao2'>
        <Image src="/telas.png" alt="Monitoramento" className='monitoramentoImagem' width={400} height={300}/>
        <div className='monitoramentoTexto'>
          <h2>Monitoramento em tempo <br /> real garantindo sua <br />segurança e qualidade</h2>
          <p>Para cada equipamento monitorado, pode-se <br />
            consultar dados precisos e em tempo real, <br />
            umidade, históricos, alarmes, traçar gráficos de <br />
            tendências e ainda exportar informações para <br />
            planilhas. <br />
            <span class="negrito2">Evite falhas inesperadas, reduza custos de <br /> 
            manutenção e aumente a eficiência operacional.</span> 
          </p>
        </div>
      </div>  
    </div>
    </>
  );
}
