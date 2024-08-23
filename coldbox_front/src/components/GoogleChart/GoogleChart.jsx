// components/GoogleChart.jsx
"use client"; // Marca o componente como um Client Component

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
        ['a', 'Câmara Principal', 'Câmara Frios', 'Câmara Bebidas','Câmara Congelados'],
        ['00h', 1000, 450, 900, 100],
        ['06h', 1170, 460, 750, 170],
        ['12h', 800, 1120, 850, 660],
        ['18h', 1030, 540, 400, 500],
      ]);

      const options = {
        title: 'Temperatura',
        curveType: 'function',
        legend: { position: 'bottom' },
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
        width: '80vw', // 80% da largura da janela
        height: '70vh', // 70% da altura da janela
        marginLeft: '6vw', // Centraliza o gráfico
      }}
    ></div>
  );
};
export default GoogleChart;
