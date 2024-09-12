"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './GoogleChart.css';

//! A prop 'exportButton' renderizará o botão de exportação apenas quando necessário
const GoogleChart = ({ exportButton }) => {

  // Estado para os dados do gráfico
  const [chartData, setChartData] = useState([]); 

  // Estado para controlar se o script foi carregado
  const [isGoogleChartsLoaded, setIsGoogleChartsLoaded] = useState(false);

  // Armazena o maior valor já visto no gráfico
  const [maxValue, setMaxValue] = useState(0);  

  // Estado para controlar a visibilidade do modal de exportação
  const [showExportModal, setShowExportModal] = useState(false);

  // Estado padrão para o seletor "Exportar visualização atual"
  const [exportCurrentView, setExportCurrentView] = useState(false);

  // Estado padrão para o seletor de período
  const [selectedOption, setSelectedOption] = useState('24h');



  //! Funções para abrir e fechar o modal de exportação
  // Função para abrir o modal de exportação
  const handleOpenExportModal = () => {
    setExportCurrentView(false); // Resetar o estado da checkbox ao abrir o modal
    setShowExportModal(true);
  };

  // Função para fechar o modal de exportação
  const handleCloseExportModal = () => {
    setShowExportModal(false);
  };


  // Função de exportação de dados
  const handleExport = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página
    alert('Exportando dados...');
    handleCloseExportModal(); // Fecha o modal após a exportação
  };



  // Função para alternar o estado da checkbox "Exportar visualização atual"
  const handleExportCurrentViewChange = () => {
    setExportCurrentView(!exportCurrentView);
  };



  //Função para quando o usuario selecionar uma nova opção no select
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };


  // Função para buscar os dados da API
  const fetchChartData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3333/dados');
      if (response.data.sucesso) {
        const dados = response.data.dados;
  
        const equipamentos = [...new Set(dados.map(item => item.equip_nome))];
  
        // Inicializa o array de dados com os cabeçalhos
        const chartDataArray = [['Hora', ...equipamentos]];
  
        // Armazena os dados reais por hora
        const dataByTime = {};
  
        let currentMax = maxValue;
  
        // Preencha os dados com base nos horários reais
        dados.forEach(item => {
          const horaReal = new Date(item.dados_data).getHours();  // Obtem apenas a hora (numérica)
          const temp = parseFloat(item.dados_temp);
  
          // Use o horário real como chave
          if (!dataByTime[horaReal]) {
            dataByTime[horaReal] = new Array(equipamentos.length).fill(null);
          }
  
          const equipIndex = equipamentos.indexOf(item.equip_nome);
          dataByTime[horaReal][equipIndex] = temp;
  
          // Atualiza o maior valor se a temperatura atual for maior
          if (temp > currentMax) {
            currentMax = temp;
          }
        });
  
        // Preencher o gráfico com os dados reais, sem ignorar horários
        Object.entries(dataByTime).forEach(([horaReal, temps]) => {
          chartDataArray.push([parseInt(horaReal), ...temps]);
        });
  
        setChartData(chartDataArray);
        setMaxValue(currentMax);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API', error);
    }
  };
  
  
  

  // Carrega o script do Google Charts e inicializa a função de desenho do gráfico
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(() => setIsGoogleChartsLoaded(true)); // Marca como carregado
    };
    document.body.appendChild(script);
  }, []);

  // Atualiza o gráfico a cada minuto
  useEffect(() => {
    fetchChartData(); // Carrega os dados inicialmente

    const interval = setInterval(() => {
      fetchChartData(); // Atualiza os dados a cada 1 minuto (60000 ms)
    }, 60000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, []);

  // Função para desenhar o gráfico
  useEffect(() => {
    const drawChart = () => {
      if (!isGoogleChartsLoaded || chartData.length === 0) {
        return;
      }
      // const data = window.google.visualization.arrayToDataTable([
      //   ['Hora', 'Principal', 'Frios', 'Bebidas', 'Congelados'],
      //   ['00h', 1000, 450, 900, 100],
      //   ['06h', 1170, 460, 750, 170],
      //   ['12h', 800, 1120, 850, 660],
      //   ['18h', 1030, 540, 400, 500],
      //   ['23h59', 584, 198, 300, 400],
      // ]);

      const data = window.google.visualization.arrayToDataTable(chartData); // Usa os dados da API

      const options = {
        // curveType: 'function',
        legend: { position: 'right', alignment: 'center', legend: 'none' },
        colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'],
        hAxis: {
          ticks: [
            { v: 2, f: '0h' },
            { v: 6, f: '6h' },
            { v: 12, f: '12h' },
            { v: 18, f: '18h' },
            { v: 23.9833, f: '23h59' }  // Valor próximo de 24h (23h59)
          ],  // Define os rótulos específicos
          gridlines: {
            count: 5  // Mostra apenas 6 linhas de grade (relacionadas aos ticks)
          }
        },        
        vAxis: {
          // title: 'Temperatura',
          viewWindow: {
            min: -4,   // Define o limite mínimo para -4°C
            max: 6     // Define o limite máximo para 6°C
          },
          gridlines: {
            count: -1
          },
          format: '#,##0°C'
        },
        
        // pointSize: 5,
        chartArea: {
          left: 70,
          width: '75%',
          height: '70%',
          right: 180,
        },
      };
      

      const chart = new window.google.visualization.LineChart(
        document.getElementById('curve_chart')
      );

      chart.draw(data, options);
    };

    if (isGoogleChartsLoaded) {
      drawChart();
    }

    window.addEventListener('resize', drawChart);
    return () => {
      window.removeEventListener('resize', drawChart);
    };
  }, [isGoogleChartsLoaded, chartData, maxValue]);


  return (
    <div className='contentGrafico'>
      <div className='headerGrafico'>
        <span className='tag'>Temperatura</span>

        {exportButton && (
          <>
            Botão para selecionar o periodo
            <select className='selecionarPeriodo' value={selectedOption} onChange={handleSelectChange}>
              <option value="24h">Últimas 24 horas</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="ano">Este Ano</option>
            </select>

            {/* Botao Exportar dados */}
            <button className='botaoExportar' onClick={handleOpenExportModal}>
              Exportar Dados
            </button>
          </>
        )}

      </div>
      <div id="curve_chart"></div>


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
                  disabled={exportCurrentView} //Desabilitar o campo se o checkbox estiver marcado  
                  className={exportCurrentView ? "desabilitarCampo" : ""} //Classe para estilizar
                  />
              </div>

              <div className="formularioData">
                <label htmlFor="dataFim">Data de Fim:</label>
                <input 
                type="date" 
                id="dataFim" 
                name="dataFim" 
                disabled={exportCurrentView} //Desabilitar o campo se o checkbox estiver marcado  
                className={exportCurrentView ? "desabilitarCampo" : ""} //Classe para estilizar
               
                required />
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