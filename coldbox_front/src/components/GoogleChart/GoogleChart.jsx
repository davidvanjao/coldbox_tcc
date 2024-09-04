"use client"; // Marca o componente como um Client Component
import React, { useState, useEffect } from 'react';
import styles from './GoogleChart.css';

// A prop 'exportButton' renderizará o botão de exportação apenas quando necessário
const GoogleChart = ({ exportButton }) => {

  // Estado para controlar a visibilidade do modal de exportação
  const [showExportModal, setShowExportModal] = useState(false);

  // Estado padrão para o seletor "Exportar visualização atual"
  const [exportCurrentView, setExportCurrentView] = useState(false);

  // Estado padrão para o seletor de período
  const [selectedOption, setSelectedOption] = useState('24h');



  // Funções para abrir e fechar o modal de exportação

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


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(drawChart);
    };
    document.body.appendChild(script);

    const drawChart = () => {
      if (!window.google.visualization) {
        return;
      }

      const data = window.google.visualization.arrayToDataTable([
        ['Hora', 'Principal', 'Frios', 'Bebidas', 'Congelados'],
        ['00h', 1000, 450, 900, 100],
        ['06h', 1170, 460, 750, 170],
        ['12h', 800, 1120, 850, 660],
        ['18h', 1030, 540, 400, 500],
        ['23h59', 584, 198, 300, 400],
      ]);

      const options = {
        curveType: 'function',
        legend: { position: 'right', alignment: 'center', legend: 'none' },
        colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'],
        hAxis: { minValue: 0, maxValue: 9 },
        pointSize: 5,
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

      window.addEventListener('resize', () => {
        chart.draw(data, options);
      });
    };

    return () => {
      window.removeEventListener('resize', drawChart);
    };
  }, []);

  return (
    <div className='contentGrafico'>
      <div className='headerGrafico'>
        <span className='tag'>Temperatura</span>

        {exportButton && (
          <>
            Botão para selecionar o periodo
            <select className='timeSelect' value={selectedOption} onChange={handleSelectChange}>
              <option value="24h">Últimas 24 horas</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="ano">Este Ano</option>
            </select>

            {/* Botao Exportar dados */}
            <button className='exportButton' onClick={handleOpenExportModal}>
              Exportar Dados
            </button>
          </>
        )}

      </div>
      <div id="curve_chart"></div>


      {/* Modal para selecionar o período de exportação */}
      {showExportModal && (
        <div className="modal-overlay" onClick={handleCloseExportModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Exportar Dados</h2>

            <form>
              <div className="form-group">
                <label htmlFor="start-date">Data de Início:</label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  disabled={exportCurrentView} //Desabilitar o campo se o checkbox estiver marcado  
                  className={exportCurrentView ? "disabled-input" : ""} //Classe para estilizar
                  />
              </div>

              <div className="form-group">
                <label htmlFor="end-date">Data de Fim:</label>
                <input 
                type="date" 
                id="end-date" 
                name="end-date" 
                disabled={exportCurrentView} //Desabilitar o campo se o checkbox estiver marcado  
                className={exportCurrentView ? "disabled-input" : ""} //Classe para estilizar
               
                required />
              </div>

              <div className="export-checkbox-container">
                <input 
                  type="checkbox"  
                  checkbox={exportCurrentView}
                  onChange={handleExportCurrentViewChange}
                  />
                <label htmlFor="exportCheckbox" className="export-checkbox-label">
                  Exportar visualização atual
                </label>
              </div>

              {/* Botões para fechar e exportar */}
              <div className="form-actions">
                <button type="button" onClick={handleCloseExportModal}>Fechar</button>
                <button type="submit" onClick={handleExport}>Exportar</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleChart;
