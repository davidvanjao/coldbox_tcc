import styles from './page.css'; // Caminho correto para o CSS dessa página
import Link from 'next/link';

export default function EsqueceuSenha() {
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
          <h2 className={styles.titulo}>Esqueceu a Senha?</h2>
          <p className={styles.descricao}>
            Insira seu email ou número de celular para redefinir sua senha.
          </p>
          <input
            type="text"
            placeholder="Email ou número do celular"
            className={styles.inputCaixa}
          />
          <button className={styles.botaoEntrar}>Enviar</button>
          <Link href="/login" className={styles.voltarLogin}>
            Voltar para o Login
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
