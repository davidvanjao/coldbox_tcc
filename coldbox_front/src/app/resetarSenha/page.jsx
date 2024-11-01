"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import axios from 'axios';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetClick = async () => {
    if (password !== confirmPassword) {
      setMessage('As senhas não correspondem.');
      return;
    }

    // Obtenha o e-mail do parâmetro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    try {
      const response = await axios.post('http://127.0.0.1:3333/redefinirSenha', {
        email,
        password,
      });

      if (response.data.sucesso) {
        setMessage('Senha redefinida com sucesso. Você pode fazer login agora.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage(response.data.mensagem || 'Erro ao redefinir a senha.');
      }
    } catch (error) {
      setMessage('Erro de rede. Tente novamente mais tarde.');
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
          <p>Redefinição de Senha</p>
          <p>Digite sua nova senha abaixo.</p>
        </div>

        <div className={styles.formulario}>
          <input
            type="password"
            placeholder="Nova Senha"
            className={styles.inputCaixa}
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Confirme sua Senha"
            className={styles.inputCaixa}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button className={styles.botaoEntrar} onClick={handleResetClick}>Redefinir Senha</button>
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
