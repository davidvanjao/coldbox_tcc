"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrigir o import do useRouter
import styles from './page.module.css';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendClick = () => {
    router.push(`/login?emailSent=${encodeURIComponent(email)}`);
  };

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
        
        <div className={styles.mensagemRecuperacao}>
          <p>Recuperação de Senha</p>
          <p>Informe o email cadastrado ou número de telefone e enviaremos um link para a recuperação de senha.</p>
        </div>

        <div className={styles.formulario}>
          <input
            type="email"
            placeholder="Digite seu email"
            className={styles.inputCaixa}
            value={email}
            onChange={handleEmailChange}
          />
          <button className={styles.botaoEntrar} onClick={handleSendClick}>Enviar</button>
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
