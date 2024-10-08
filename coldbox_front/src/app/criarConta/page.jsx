"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreateAccount = () => {
    // Validação do número de telefone (deve ter 9 dígitos)
    if (phone.length !== 9) {
      setError('Número de telefone inválido. Deve conter 9 dígitos.');
      return;
    }
    
    // Lógica para criar conta aqui
    // Após a criação da conta, redirecione para a tela de login
    router.push('/login');
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
          <p>Criação de Conta</p>
          <p>Preencha os campos abaixo para criar sua conta.</p>
        </div>

        <div className={styles.formulario}>
          <input
            type="text"
            placeholder="Usuário"
            className={styles.inputCaixa}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={styles.inputCaixa}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.inputCaixa}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone (9 dígitos)"
            className={styles.inputCaixa}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <p className={styles.errorMessage}>{error}</p>} {/* Exibe a mensagem de erro */}
          <button className={styles.botaoEntrar} onClick={handleCreateAccount}>
            Criar Conta
          </button>
          <Link href="/login" className={styles.voltarLogin}>
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
