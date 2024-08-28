"use client";

import styles from './page.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <div className='container'>
        <header className="header">
          <nav className="nav">
            <Link href="/landingpage" className="link">Início</Link>
            <Link href="/solucoes" className="link">Soluções</Link>
            <Link href="/recursos" className="link">Recursos</Link>
            <Link href="/aplicativo" className="link">Aplicativo</Link>
            <Link href="/SAC" className="link">SAC</Link>
            <Link href="/login">
              <button className="loginButton">Login</button>
            </Link>
          </nav>
        </header>

        <div className="imagemFundo">
          <div className="textoSobreImagem">
            <h2 className='negrito'>Garanta sua <span className="degrade">Eficiência <br />Operacional</span> e <br /> monitore em tempo <br />real a temperatura de <br />seus equipamentos</h2>
            <p>Fale com um de nossos consultores <br />e agende uma Visita Técnica</p>
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
              <span className="negrito2">Evite falhas inesperadas, reduza custos de <br /> 
              manutenção e aumente a eficiência operacional.</span> 
            </p>
          </div>
        </div>  
      </div>
    </>
  );
}
