"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(""); // Estado para armazenar o user_id
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      // Log para depuração
      console.log("router.isReady:", router.isReady);
      console.log("router.query:", router.query);

      const user_id = router.query.user_id;

      // Verifica se o user_id foi extraído corretamente
      if (user_id) {
        setUserId(user_id); // Armazena o user_id quando disponível
        console.log("user_id recebido da URL:", user_id);
      } else {
        setMessage("ID de usuário inválido. Por favor, tente novamente.");
      }
    }
  }, [router.isReady, router.query]);

  // Atualiza o estado com o valor da senha
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Atualiza o estado com o valor da confirmação de senha
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Lógica para redefinição de senha
  const handleResetClick = async () => {
    if (!userId) {
      setMessage("ID de usuário inválido. Por favor, tente novamente.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não correspondem.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:3333/redefinirSenha", {
        user_id: userId,
        password,
      });

      if (response.data.sucesso) {
        setMessage("Senha redefinida com sucesso. Redirecionando para login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(response.data.mensagem || "Erro ao redefinir a senha.");
      }
    } catch (error) {
      setMessage("Erro de rede. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
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
          <button
            className={styles.botaoEntrar}
            onClick={handleResetClick}
            disabled={loading}
          >
            {loading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
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
