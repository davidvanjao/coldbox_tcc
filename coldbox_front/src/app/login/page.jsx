"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

export default function Login() {
  const searchParams = useSearchParams();
  const emailSent = searchParams.get('emailSent');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (emailSent) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 30000); // Mensagem some após 30 segundos
    }
  }, [emailSent]);

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
        
        {showMessage && (
          <div className={styles.caixaMensagem}>
            <span className={styles.iconeVisto}>✔️</span>
            <span>
              Um e-mail foi enviado para <strong>{emailSent}</strong> para realizar a alteração da senha.
            </span>
          </div>
        )}
        
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
          <Link href="/tempoReal">
            <button className="botaoEntrar">Entrar</button>
          </Link>
          <Link href="/esqueceuSenha" className={styles.esqueceuSenha}>
            Esqueceu a Senha?
          </Link>
        </div>

        {/* Novo botão Criar Conta */}
        <button className={styles.botaoCriarConta}>
        <Link href="/criarConta">Criar Conta</Link>
        </button>

        <div className={styles.extras}>
            <span>Ajuda</span>
            <span>Sobre</span>
            <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
