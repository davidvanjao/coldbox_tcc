import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import alertasTeste from './AlertasDados';
import styles from './Alertas.css';

export default function Alerta() {
    // Estado para controlar o alerta selecionado e se o modal está aberto ou fechado
    const [selectedAlerta, setSelectedAlerta] = useState(null); // Armazena o alerta que foi selecionado
    const [showModal, setShowModal] = useState(false); // Controla a visibilidade do modal (aberto ou fechado)
  
    // Função que é chamada quando o usuário clica em um alerta para abrir o modal com mais informações
    const handleOpenModal = (alerta) => {
      setSelectedAlerta(alerta); // Armazena o alerta que foi clicado
      setShowModal(true); // Abre o modal
    };
  
    // Função para fechar o modal
    const handleCloseModal = () => {
      setShowModal(false); // Fecha o modal
      setSelectedAlerta(null); // Limpa o alerta selecionado quando o modal é fechado
    };
  
    return (
      <div className="alertaContainer">
        {/* Cabeçalho da área de alertas */}
        <div className='barraAlerta'>
          <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginLeft: '10px', fontSize: '18px' }} />
          <span className='tag'>Alerta</span>
        </div>
  
        {/* Conteúdo dos alertas que lista todos os alertas disponíveis */}
        <div className='conteudoAlertas'>
          {alertasTeste.map(alerta => (
            <div key={alerta.id} className='alertaItem' onClick={() => handleOpenModal(alerta)}>
              {/* Quando clicado, chama handleOpenModal com o alerta correspondente */}
              <p className='alertaMensagem'>{alerta.mensagem}</p>
              <p className='alertaDetalhes'>{alerta.camara}. {alerta.data}</p>
            </div>
          ))}
        </div>
  
        {/* Modal que aparece com detalhes do alerta quando um alerta é clicado */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            {/* Impede que o modal feche ao clicar no conteúdo interno */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>
                {/* Ícone e título do alerta no modal */}
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginRight: '10px', fontSize: '24px', color: 'red' }} />
                {selectedAlerta.mensagem} {/* Mostra a mensagem do alerta selecionado */}
              </h2>
              <p>A <strong>{selectedAlerta.camara}</strong> excedeu o limite de temperatura previsto. Entre em contato com a equipe técnica e verifique:</p>
              {/* Lista de sugestões de ações para resolver o problema */}
              <ul>
                <li>Sistema de refrigeração</li>
                <li>Frost ou gelo excessivo</li>
                <li>Sensores de temperatura</li>
                <li>Fechamento e vedação das portas</li>
                <li>Manutenção preventiva</li>
                <li>Registros de temperatura</li>
              </ul>
              <div className="form-actions">
                <button onClick={handleCloseModal}>Fechar</button> {/* Botão para fechar o modal */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }