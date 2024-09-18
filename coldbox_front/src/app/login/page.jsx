"use client";

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import axios from 'axios'; 

export default function Login() {
  const searchParams = useSearchParams();
  const emailSent = searchParams.get('emailSent');
  const [showMessage, setShowMessage] = useState(false);
  const [email, setEmail] = useState('');  // Estado para o campo de email
  const [senha, setSenha] = useState('');  // Estado para o campo de senha
  const [error, setError] = useState('');
  const router = useRouter();  // Usado para redirecionamento após o login

  // Função para efetuar login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Limpa qualquer mensagem de erro anterior

    try {
      const response = await axios.post('http://127.0.0.1:3333/usuarios/login', {
        user_email: email,  // Enviando o email coletado no campo
        user_senha: senha,
      });

      if (response.data.sucesso) {
        //Salvar o nome de usuario para utilizar na tela principal
        localStorage.setItem('userName', response.data.dados[0].user_nome);
        localStorage.setItem('userId', response.data.dados[0].user_id);

        // Redireciona para a página de tempo real se o login for bem-sucedido
        router.push('tempoReal');
      } else {
        // Exibe mensagem de erro se as credenciais estiverem incorretas
        setError('Login ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao tentar logar:', error);
      setError('Ocorreu um erro no servidor. Tente novamente mais tarde.');
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

        {showMessage && (
          <div className={styles.caixaMensagem}>
            <span className={styles.iconeVisto}>✔️</span>
            <span>
              Um e-mail foi enviado para <strong>{emailSent}</strong> para realizar a alteração da senha.
            </span>
          </div>
        )}

        <form className={styles.formulario} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputCaixa}
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado com o email
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.inputCaixa}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}  // Atualiza o estado com a senha
            required
          />
          <button type="submit" className="botaoEntrar">Entrar</button>
        </form>

        {error && <div className={styles.error}>{error}</div>}  {/* Exibe mensagem de erro */}

        <div className={styles.extras}>
          <span>Ajuda</span>
          <span>Sobre</span>
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
