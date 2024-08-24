import styles from './page.module.css'
import Link from 'next/link';


export default function Login() {
  return (
    <div className={styles.fundo}>
      <div className={styles.retanguloContainer}>
        <div className={styles.idioma}>
          <span>Português (Brasil)</span>
        </div>
        <div className={styles.logo}>
          <img src="/logo.png" alt="ColdBox Logo" />
          <span>ColdBox</span>          
        </div>
        <div className={styles.formulario}>
          <input
            type="text"
            placeholder="Número do celular ou email"
            className={styles.inputCaixa}
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.inputCaixa}
          />
          <button className={styles.botaoEntrar}>Entrar</button>
          <Link href="/esqueceuSenha" className={styles.esqueceuSenha}>
            Esqueceu a Senha?
          </Link>
        </div>
        <div className={styles.extras}>
            <span>Ajuda</span>
            <span>Sobre</span>
            <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
