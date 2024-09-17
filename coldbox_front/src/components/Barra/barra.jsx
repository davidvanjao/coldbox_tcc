'use client'
import Link from 'next/link';
import styles from './barra.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

// Função para a edição do perfil do usuario
const BarraSuperior = () => {
  const [showModal, setShowModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState('/user.png'); // Caminho inicial para a imagem de perfil
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
    
  useEffect(() => {
    //Pegar o nome de usuario do localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Edição da foto de perfil do usuario
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file)); // Cria um URL temporário para a imagem selecionada
    }
  };

  const handleSave = () => {
    // Atualiza a foto de perfil com a nova imagem selecionada
    if (selectedFile) {
      setProfilePicture(selectedFile);
      setSelectedFile(null); // Limpa o estado temporário após salvar
    }
    handleCloseModal(); // Fecha o modal após salvar
  };


  return (
    <div className='barraSuperior'>
        <div className='nomeEmpresa'>
            <h1>Supermercado Gaspar</h1>
                <div className='tagsInformacao'>
                    <span className='tag'>Ambiente Refrigerado</span>
                    <span className='tag'>MEGA2560</span>
                    <span className='tag'>ESP8266</span>
                </div>
                <p>Atualizado agora mesmo</p>
        </div>

        <div className='perfilUsuario'>
          <div className='informacaoUsuario'>
            <img src="/user.png" alt="Usuario" />
              <div>
              <h3>{userName || 'Usuário'}</h3> {/* Exibe o nome recuperado ou 'Usuário' como fallback */}
                  <span>Administrador</span>
              </div>
          </div>
            <button className='botaoConfiguracao' onClick={handleOpenModal}>
              <FontAwesomeIcon icon={faGear} className='iconeConfig'/>
            </button>
        </div>

        {/* Renderiza o modal somente se showModal for true */}
        {showModal && (
          <div className="telaSobreposicao" onClick={handleCloseModal}>
            <div className="containerSobreposicao" onClick={(e) => e.stopPropagation()}>
              <h2>Editar Perfil</h2>

              {/* Área da foto de perfil */}
              <div className="fotoDePerfil">
                  <img src={selectedFile || profilePicture} alt="Foto de Perfil" className="imagemDePerfil" />
                <div className="sobreposicaoParaEditar">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Esconde o input de arquivo
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="editarFotoDePerfil">
                    Alterar foto do perfil
                  </label>
                </div>
              </div>

              <form>
              {/* Campo para alterar o nome */}
              <div className="formularios">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" placeholder="Seu nome" />
              </div>

              {/* Campo para alterar o nome de usuário */}
              <div className="formularios">
                <label htmlFor="username">Nome de Usuário:</label>
                <input type="text" id="username" name="username" placeholder="Seu nome de usuário" />
              </div>

              {/* Campo para alterar o email */}
              <div className="formularios">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Seu email" />
              </div>

              {/* Campo para alterar o número de telefone */}
              <div className="formularios">
                <label htmlFor="phone">Número de Telefone:</label>
                {/* input com validação para que só seja digitado números */}
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Seu número de telefone"
                  pattern="\d*"
                  inputMode="numeric"
                  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                />
              </div>

              {/* Botões para fechar e salvar */}
              <div className="botoesFecharSalvar">
                <button type="button" onClick={handleCloseModal}>Fechar</button>
                <button type="submit">Salvar</button>
              </div>
            </form>
            </div>
          </div>
        )}
  </div>
  );
}

export default BarraSuperior;