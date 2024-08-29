'use client'
import Link from 'next/link';
import styles from './barra.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

// Função para a edição do perfil do usuario
const BarraSuperior = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                <h3>Pedro Lima</h3>
                  <span>Administrador</span>
              </div>
          </div>
            <button className='botaoConfiguracao' onClick={handleOpenModal}>
              <FontAwesomeIcon icon={faGear} className='iconeConfig'/>
            </button>
        </div>

        {/* Renderiza o modal somente se showModal for true */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Editar Perfil</h2>
               
              <form>
              {/* Campo para alterar a foto de perfil */}
              <div className="form-group">
                <label htmlFor="profilePicture">Foto de Perfil:</label>
                <input type="file" id="profilePicture" name="profilePicture" accept="image/*" />
              </div>

              {/* Campo para alterar o nome */}
              <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" placeholder="Seu nome" />
              </div>

              {/* Campo para alterar o nome de usuário */}
              <div className="form-group">
                <label htmlFor="username">Nome de Usuário:</label>
                <input type="text" id="username" name="username" placeholder="Seu nome de usuário" />
              </div>

              {/* Campo para alterar o email */}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Seu email" />
              </div>

              {/* Campo para alterar o número de telefone */}
              <div className="form-group">
                <label htmlFor="phone">Número de Telefone:</label>
                <input type="tel" id="phone" name="phone" placeholder="Seu número de telefone" />
              </div>

              {/* Botões para fechar e salvar */}
              <div className="form-actions">
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