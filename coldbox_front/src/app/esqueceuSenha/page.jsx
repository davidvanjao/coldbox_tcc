"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendClick = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3333/usuarios', { email });

      if (response.data && response.data.sucesso) {
        setMessage('Link de recuperação enviado! Verifique seu e-mail.');
        setTimeout(() => {
          router.push('/resetarSenha');
        }, 2000);
    } else {
        setMessage(response.data?.mensagem || 'Erro ao enviar link de recuperação.');
    }    
    } catch (error) {
      setMessage('Erro de rede. Tente novamente mais tarde.');
      console.error(error);
    }
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
          {message && <p className={styles.mensagemStatus}>{message}</p>}
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
