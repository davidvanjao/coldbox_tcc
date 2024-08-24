import styles from './page.module.css';
import Link from 'next/link';

export default function esqueceuSenha() {
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
          {/* Conteúdo da página de recuperação de senha */}
          <input
            type="email"
            placeholder="Digite seu email"
            className={styles.inputCaixa}
          />
          <button className={styles.botaoEntrar}>Enviar</button>
          <Link href="/login" className={styles.esqueceuSenha}>
            Voltar para Login
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
