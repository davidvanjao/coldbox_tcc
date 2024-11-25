import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './Alertas.css';

export default function Alerta() {
    const [alertas, setAlertas] = useState([]); // Estado para armazenar alertas
    const [selectedAlerta, setSelectedAlerta] = useState(null); // Alerta selecionado
    const [showModal, setShowModal] = useState(false); // Controle do modal

    // Função para buscar os equipamentos associados ao cli_id
    const fetchEquipamentos = async () => {
        try {
            const cli_id = localStorage.getItem('cli_id'); // Recupera o cli_id do local storage
            const { data } = await axios.get(`http://127.0.0.1:3333/equipamento/${cli_id}`);
            return data.dados.map(equip => equip.equip_id); // Retorna apenas os equip_id
        } catch (error) {
            console.error('Erro ao buscar equipamentos:', error);
            return [];
        }
    };

    // Função para buscar os alertas de todos os equipamentos
    const fetchAlertas = async () => {
        try {
            const equipIds = await fetchEquipamentos(); // Busca os equip_id vinculados ao cli_id
            const alertasTotais = [];

            // Itera sobre os equipamentos e busca alertas para cada equip_id
            for (const equipId of equipIds) {
                const { data } = await axios.get(`http://127.0.0.1:3333/logs/listarNotificacoesNaoVisualizadasWEB/${equipId}`);
                alertasTotais.push(...data.dados); // Adiciona os alertas retornados ao array total
            }

            setAlertas(alertasTotais); // Atualiza o estado com todos os alertas combinados
        } catch (error) {
            console.error('Erro ao buscar alertas:', error);
        }
    };

    // Atualiza os alertas em tempo real (a cada 5 segundos)
    useEffect(() => {
        fetchAlertas(); // Busca os alertas inicialmente
        const interval = setInterval(fetchAlertas, 5000); // Atualiza a cada 5 segundos
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, []);

    // Abre o modal com o alerta selecionado
    const handleOpenModal = async (alerta) => {
      try {
          console.log('Alerta clicado:', alerta);
  
          // Recupera o ID do usuário do localStorage
          const user_id = localStorage.getItem('userId');
          if (!user_id) {
              console.error('Erro: ID do usuário não encontrado no localStorage.');
              return;
          }
  
          // Envia a requisição ao backend para atualizar o status do alerta
          await axios.patch(`http://127.0.0.1:3333/logs/editarWeb/${alerta.alertEnviado_id}`, {
              alertEnviado_status: 'VISUALIZADO',
              alertEnviado_usuario_retorno: user_id // Usa o ID do usuário
          });
  
          console.log('Status do alerta atualizado no backend.');
  
          // Remove o alerta do estado local
          setAlertas((prevAlertas) => prevAlertas.filter(a => a.alertEnviado_id !== alerta.alertEnviado_id));
  
          // Exibe o modal
          setSelectedAlerta(alerta);
          setShowModal(true);
      } catch (error) {
          console.error('Erro ao marcar alerta como visualizado:', error);
      }
  };
  
  

    // Fecha o modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAlerta(null);
    };

    return (
        <div className="alertaContainer">
            {/* Cabeçalho da área de alertas */}
            <div className="barraAlerta">
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginLeft: '10px', fontSize: '18px' }} />
                <span className="tag">Alertas</span>
            </div>

            {/* Conteúdo dos alertas */}
            <div className="conteudoAlertas">
                {alertas.length > 0 ? (
                    alertas.map(alerta => (
                      <div key={alerta.alertEnviado_id} className="alertaItem" onClick={() => handleOpenModal(alerta)}>
                          <p className="alertaMensagem">{alerta.alerta_tipo}</p>
                          <p className="alertaDetalhes">{`Equipamento: ${alerta.local_nome} | Temperatura: ${alerta.dados_temp}°C | ${new Date(alerta.alertEnviado_data).toLocaleString()}`}</p>
                      </div>
                    ))
                ) : (
                    <p className="semAlertas">Nenhum alerta ativo no momento.</p>
                )}
            </div>

            {/* Modal para detalhes do alerta */}
            {showModal && selectedAlerta && (
    <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginRight: '10px', fontSize: '24px', color: 'red' }} />
                {selectedAlerta.alerta_tipo}
            </h2>
            <p>
                O alerta refere-se ao equipamento <strong>{selectedAlerta.local_nome}</strong>, que registrou uma temperatura de <strong>{selectedAlerta.dados_temp}°C</strong>.
            </p>
            <p>Por favor, verifique as condições do equipamento e tome as seguintes verificações:</p>
            <ul>
                <li>Sistema de refrigeração</li>
                <li>Frost ou gelo excessivo</li>
                <li>Sensores de temperatura</li>
                <li>Fechamento e vedação das portas</li>
                <li>Manutenção preventiva</li>
                <li>Registros de temperatura</li>
            </ul>
            <div className="form-actions">
                <button onClick={handleCloseModal}>Fechar</button>
            </div>
        </div>
    </div>
)}

        </div>
    );
}
