import styles from './sac.css';
import Image from 'next/image';
import Link from 'next/link';

export default function SACPage() {
  return (
    <>
      <div className="container">
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
        <div className="sacContainer">
          <h2 className="titulo">Serviço de Atendimento ao Cliente</h2>
          <div className="infoContainer">
            <div className="infoItem">
              <h3>Nome:</h3>
              <p>Henrico Marmo</p>
            </div>
            <div className="infoItem">
              <h3>Email:</h3>
              <p>marmonepomuceno@gmail.com</p>
            </div>
            <div className="infoItem">
              <h3>Telefone:</h3>
              <p>(14)1234-5678</p>
            </div>
          </div>
          <div className="sacImagem">
            <Image src="/atendimento.png" alt="Atendimento ao Cliente" width={500} height={400} />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
