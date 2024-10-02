"use client";
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import styles from './GoogleChart.css'; 

// A prop 'exportButton' renderizará o botão de exportação apenas quando necessário
const GoogleChart = ({ exportButton }) => {
  // Estado para os dados do gráfico
  const [chartData, setChartData] = useState([]); 

  // Estado para controlar se o script foi carregado
  const [isGoogleChartsLoaded, setIsGoogleChartsLoaded] = useState(false);

  // Armazena o maior valor já visto no gráfico
  const [maxValue, setMaxValue] = useState(0);

  // Estado para controlar a visibilidade do modal de exportação
  const [showExportModal, setShowExportModal] = useState(false);

  // Estado para a checkbox "Exportar visualização atual"
  const [exportCurrentView, setExportCurrentView] = useState(false);

  // Estado para o seletor de período
  const [selectedOption, setSelectedOption] = useState('24h');

  //! Funções para abrir e fechar o modal de exportação
  const handleOpenExportModal = () => {
    setExportCurrentView(false); // Resetar o estado da checkbox ao abrir o modal
    setShowExportModal(true);
  };

  const handleCloseExportModal = () => {
    setShowExportModal(false);
  };

  // Função de exportação de dados (no momento, apenas exibe um alerta)
  const handleExport = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página
    alert('Exportando dados...');
    handleCloseExportModal(); // Fecha o modal após a exportação
  };

  // Alterna o estado da checkbox "Exportar visualização atual"
  const handleExportCurrentViewChange = () => {
    setExportCurrentView(!exportCurrentView);
  };

  // Atualiza o estado ao selecionar uma nova opção no seletor de período
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //Função para abreviar o nome dos equipamentos, pegando sempre a ultima palavra
  const abreviarNomeEquipamento = (nome) => {
      const palavras = nome.split(' '); //Divide o nome em palavras
      return palavras[palavras.length - 1]; //Retorna a ultima palavra
  };

  //! Função para buscar os dados da API
  const fetchChartData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3333/dados/3'); // Faz uma requisição para obter os dados da API
      if (response.data.sucesso) { 
        const dados = response.data.dados; // Extrai os dados da resposta da API

        // Substitui os nomes completos pelos abreviados
        const equipamentos = [...new Set(dados.map(item => abreviarNomeEquipamento(item.local_nome)))];

        // Inicializa o array de dados com os cabeçalhos
        const chartDataArray = [['Data', ...equipamentos]];

        // Armazena os dados reais pela data/hora
        const dataByTime = {};

        let currentMax = maxValue; // Inicializa o maior valor com o estado maxValue

        
        // Preenche os dados com base nos horários reais
        dados.forEach(item => {
          // Verifica se a string de data está no formato correto e converte para Date
          let dataCompleta = new Date(item.dados_data);

          // Se a data não for válida, tente corrigir o formato
          if (isNaN(dataCompleta.getTime())) {
            dataCompleta = new Date(item.dados_data.replace(' ', 'T')); // Converte 'YYYY-MM-DD HH:MM:SS' para 'YYYY-MM-DDTHH:MM:SS'
          }

          if (isNaN(dataCompleta.getTime())) {  // Se ainda for inválida, log o erro
            console.error(`Data inválida: ${item.dados_data}`);
            return;
          }
          
          const temp = parseFloat(item.dados_temp);

          const formattedTime = `${dataCompleta.getHours()}:${dataCompleta.getMinutes()}:${dataCompleta.getSeconds()}`; // Formata a data completa

          if (!dataByTime[formattedTime]) {
            dataByTime[formattedTime] = new Array(equipamentos.length).fill(null); // Cria um array de temperaturas
          }

          const equipIndex = equipamentos.indexOf(abreviarNomeEquipamento(item.local_nome)); // Obtém o índice do equipamento abreviado
          dataByTime[formattedTime][equipIndex] = temp; // Atribui a temperatura ao horário e equipamento

          if (temp > currentMax) { // Atualiza o maior valor de temperatura se necessário
            currentMax = temp;
          }
        });

        // Insere os dados no array de dados do gráfico
        Object.entries(dataByTime).forEach(([formattedTime, temps]) => {
          chartDataArray.push([formattedTime, ...temps]);
        });

        setChartData(chartDataArray); // Atualiza os dados do gráfico
        setMaxValue(currentMax); // Atualiza o valor máximo
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API', error); // Lida com erros da API
    }
  };

  //! Carrega o script do Google Charts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js'; // URL do Google Charts
    script.async = true;
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(() => setIsGoogleChartsLoaded(true)); // Marca como carregado
    };
    document.body.appendChild(script); // Adiciona o script ao documento
  }, []);

  //! Atualiza o gráfico a cada minuto
  useEffect(() => {
    fetchChartData(); // Carrega os dados inicialmente

    const interval = setInterval(() => {
      fetchChartData(); // Atualiza os dados a cada minuto
    }, 60000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  //! Desenha o gráfico quando os dados e o Google Charts estão prontos
  useEffect(() => {
    const drawChart = () => {
      if (!isGoogleChartsLoaded || chartData.length === 0) {
        return; // Se o script não estiver carregado ou não houver dados, não faz nada
      }

      const data = window.google.visualization.arrayToDataTable(chartData); // Converte os dados em formato do Google Charts

      // Definindo o formatter para adicionar "°C" e limitar a 1 casa decimal
      const formatter = new window.google.visualization.NumberFormat({
        suffix: '°C',  // Sufixo que vai aparecer após o número
        fractionDigits: 0, // Limita a 1 casa decimal
      });

      // Aplica o formatter para cada coluna de temperatura no gráfico
      for (let i = 1; i < chartData[0].length; i++) {
        formatter.format(data, i); // Aplica o formatter na coluna i (pula a coluna 'Hora')
      }

      const options = {
        legend: { position: 'right', alignment: 'center', legend: 'none' },
        colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'], // Define as cores das linhas
        hAxis: {
          ticks: [
            { v: 2, f: '0h' }, // Rótulo da hora
            { v: 6, f: '6h' },
            { v: 12, f: '12h' },
            { v: 18, f: '18h' },
            { v: 23.9833, f: '23h59' } // Próximo de 24h
          ],
          gridlines: { count: 5 } // Quantidade de linhas de grade
        },
        vAxis: {
          viewWindow: { min: -4, max: 6 }, // Intervalo de temperatura (-4°C a 6°C)
          format: '#,##0°C'
        },
        chartArea: {
          left: 70,
          width: '75%',
          height: '70%',
          right: 180,
        },
        tooltip: { isHtml: true }, // Habilita tooltips em HTML
      };

      const chart = new window.google.visualization.LineChart(
        document.getElementById('curve_chart')
      );
      chart.draw(data, options); // Desenha o gráfico com os dados e opções
    };

    if (isGoogleChartsLoaded) {
      drawChart();
    }

    window.addEventListener('resize', drawChart); // Redesenha o gráfico ao redimensionar a janela
    return () => {
      window.removeEventListener('resize', drawChart); // Remove o listener ao desmontar o componente
    };
  }, [isGoogleChartsLoaded, chartData, maxValue]);

  return (
    <div className='contentGrafico'>
      <div className='headerGrafico'>
        <span className='tag'>Temperatura</span>

        {exportButton && ( // Renderiza o botão de exportação se 'exportButton' estiver ativo
          <>
            Botão para selecionar o periodo
            <select className='selecionarPeriodo' value={selectedOption} onChange={handleSelectChange}>
              <option value="24h">Últimas 24 horas</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="ano">Este Ano</option>
            </select>

            {/* Botão para abrir o modal de exportação */}
            <button className='botaoExportar' onClick={handleOpenExportModal}>
              Exportar Dados
            </button>
          </>
        )}
      </div>
      <div id="curve_chart"></div> {/* Onde o gráfico será renderizado */}

      {/* Modal para selecionar o período de exportação */}
      {showExportModal && (
        <div className="telaSobreposta" onClick={handleCloseExportModal}>
          <div className="conteudoDaSobreposicao" onClick={(e) => e.stopPropagation()}>
            <h2>Exportar Dados</h2>

            <form>
              <div className="formularioData">
                <label htmlFor="dataInicio">Data de Início:</label>
                <input
                  type="date"
                  id="dataInicio"
                  name="dataInicio"
                  disabled={exportCurrentView} // Desabilita o campo se a checkbox estiver marcada
                  className={exportCurrentView ? "desabilitarCampo" : ""}
                />
              </div>

              <div className="formularioData">
                <label htmlFor="dataFim">Data de Fim:</label>
                <input 
                  type="date" 
                  id="dataFim" 
                  name="dataFim" 
                  disabled={exportCurrentView} 
                  className={exportCurrentView ? "desabilitarCampo" : ""}
                  required 
                />
              </div>

              <div className="containerCheckBox">
                <input 
                  type="checkbox"  
                  checkbox={exportCurrentView}
                  onChange={handleExportCurrentViewChange}
                />
                <label htmlFor="exportCheckbox" className="checkBoxLabel">
                  Exportar visualização atual
                </label>
              </div>

              {/* Botões para fechar e exportar */}
              <div className="botaoFecharExportar">
                <button type="fechar" onClick={handleCloseExportModal}>Fechar</button>
                <button type="exportar" onClick={handleExport}>Exportar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleChart;


//! ALTERAÇÃO PARA O BANCO DE DADOS
// DESCRIBE dados; //! VISUALIZAR FORMATO DA TABELA
// ALTER TABLE dados MODIFY dados_temp FLOAT; //! ALTERAÇÃO