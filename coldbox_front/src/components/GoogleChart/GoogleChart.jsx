"use client"; // Marca o componente como um Client Component
import styles from './GoogleChart.css' 

import { useEffect } from 'react';

const GoogleChart = () => {
  useEffect(() => {
    // Carrega o script do Google Charts
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    script.onload = () => {
      // Configura e desenha o gráfico
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(drawChart);
    };
    document.body.appendChild(script);

    const drawChart = () => {
      const data = window.google.visualization.arrayToDataTable([
        ['a', 'Principal', 'Frios', 'Bebidas','Congelados'],
        ['00h', 1000, 450, 900, 100],
        ['06h', 1170, 460, 750, 170],
        ['12h', 800, 1120, 850, 660],
        ['18h', 1030, 540, 400, 500],
        ['23h59', 584, 198, 300, 400],
      ]);

      const options = {
        title: 'Temperatura',
        curveType: 'function',
        legend: { position: 'right' , alignment: 'center', legend: 'none' },  // Posiciona a legenda à direita do gráfico
        colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'],
        
        //Estilização das bolinhas do grafico
        hAxis: { minValue: 0, maxValue: 9 },
        curveType: 'function',
        pointSize: 5,

        chartArea: {
          left: 70,  // Ajusta a margem esquerda para aproximar o gráfico da borda
          width: '75%',  // Ajusta a largura da área do gráfico
          height: '70%',  // Ajusta a altura da área do gráfico
          right: 180,  // Adiciona um espaço entre o gráfico e a legenda
        },
        // hAxis: {
        //   title: 'Horário do Dia',
        // },
        // vAxis: {
        //   title: 'Temperatura (°C)', 
        // },
        // Outras opções de configuração...
      };

      const chart = new window.google.visualization.LineChart(
        document.getElementById('curve_chart')
      );

      chart.draw(data, options);
    };
  }, []);

  // Define o tamanho do gráfico com base no viewport
  return (
    <div
  id="curve_chart"
  style={{
    width: '100%',
    height: '100%',
    margin: '0', // Removendo margens para centralização completa
    position: 'relative', // Garantir que preencha o contêiner pai
  }}
></div>

  );
};
export default GoogleChart;




