"use client";

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import axios from 'axios';

export default function Login() {
  const searchParams = useSearchParams();
  const emailSent = searchParams.get('emailSent'); 
  const [showMessage, setShowMessage] = useState(false); 
  const [loginInput, setLoginInput] = useState(''); 
  const [senha, setSenha] = useState(''); 
  const [error, setError] = useState('');  
  const router = useRouter(); 

  //Verifica se o input é um e-mail
  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  //Função para efetuar login e buscar dados do usuário e empresa
  const handleLogin = async (e) => {
    e.preventDefault(); //Evita comportamento padrão do formulário
    setError(''); // impa qualquer erro anterior

    try {
      const loginField = isEmail(loginInput) ? 'user_email' : 'user_nome'; //Verifica se o campo é um email ou nome de usuário

      //Requisição para realizar login
      const response = await axios.post('http://127.0.0.1:3333/usuarios/login', {
        [loginField]: loginInput,
        user_senha: senha,
      });

      if (response.data.sucesso) {
        const { user_id, user_nome } = response.data.dados[0];

        //Armazena o nome e o ID do usuário no localStorage
        localStorage.setItem('userName', user_nome);
        localStorage.setItem('userId', user_id);

        //Requisição para buscar o cli_id da empresa associada ao usuário
        const empresaResponse = await axios.get(`http://127.0.0.1:3333/usuarios/dadosUsuarioEmpresa/${user_id}`);
        if (empresaResponse.data.sucesso) {
          const cliId = empresaResponse.data.dados[0].cli_id;

          //Armazena o cli_id no localStorage
          localStorage.setItem('cli_id', cliId);

          //Redireciona para a página de Tempo Real após login bem-sucedido
          router.push('/tempoReal');
        } else {
          setError('Erro ao buscar os dados da empresa.');
        }
      } else {
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

        {/* Mensagem de confirmação de e-mail enviado */}
        {showMessage && (
          <div className={styles.caixaMensagem}>
            <span className={styles.iconeVisto}>✔️</span>
            <span>Um e-mail foi enviado para <strong>{emailSent}</strong> para redefinir a senha.</span>
          </div>
        )}

        {/* Formulário de login */}
        <form className={styles.formulario} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email ou Usuário"
            className={styles.inputCaixa}
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}  //Atualiza o campo de email ou username
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.inputCaixa}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}  //Atualiza o campo de senha
            required
          />
          <button type="submit" className="botaoEntrar">Entrar</button>
        </form>

        {/* Exibe mensagem de erro, se houver */}
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.extras}>
          <span>Ajuda</span>
          <span>Sobre</span>
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
