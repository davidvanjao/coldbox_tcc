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
            <Link href="/" className="link">Início</Link>
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
        <div className="terceiraSecao">
          <h2 className="tituloSecao">O <span className="destaque">monitoramento online</span> não termina na falha detectada</h2>
          <p className="subtituloSecao">Veja o que você terá acesso</p>

          <div className="cardsContainer">
            <div className="card">
              <img src="/notificacoes.png" alt="Notificações" className="imagemCard" />
              <h3 className="tituloCard">NOTIFICAÇÕES PUSH</h3>
              <p className="descricaoCard">
                Envio de notificações sobre falhas em tempo real diretamente do sistema ColdBox aos usuários.
              </p>
            </div>

            <div className="card">
              <img src="/logEventos.png" alt="Log de Eventos" className="imagemCard" />
              <h3 className="tituloCard">LOG DE EVENTOS</h3>
              <p className="descricaoCard">
                Registro das falhas no sistema de eventos, com acesso ao histórico e exportação de relatórios gráficos.
              </p>
            </div>

            <div className="card">
              <img src="/appMonitoramento.png" alt="App de Monitoramento" className="imagemCard" />
              <h3 className="tituloCard">APP DE MONITORAMENTO</h3>
              <p className="descricaoCard">
                Acesso ao app ColdBox e informações em tempo real de seus dispositivos monitorados.
              </p>
            </div>

            <div className="card">
              <img src="/instrucoesAcao.png" alt="Instruções de Ação" className="imagemCard" />
              <h3 className="tituloCard">INSTRUÇÕES DE AÇÃO</h3>
              <p className="descricaoCard">
                Fornecimento de instruções sobre ações a serem tomadas em caso de falhas no sistema.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
