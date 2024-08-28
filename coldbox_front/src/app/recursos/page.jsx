import styles from './page.css';
import Link from 'next/link';

export default function RecursosPage() {
  return (
    <>
      <div className='container'>
        <header className="header">
          <nav className="nav">
            <Link href="/inicio" className="link">Início</Link>
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
          <div className="recursosContainer">
            <h2 className='negrito'>Recursos</h2>
            <p>Explore todas as ferramentas e funcionalidades que nosso sistema oferece para garantir a eficiência e segurança das câmaras frias.</p>
            <ul>
              <li>Monitoramento em tempo real</li>
              <li>Alertas automáticos</li>
              <li>Relatórios detalhados</li>
              <li>Suporte técnico 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
