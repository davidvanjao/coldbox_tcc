"use client"; // Marca o componente como um Client Component
import styles from './GoogleChart.css' 
import { useEffect } from 'react';

const GoogleChart = ({ selecionados }) => {
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
      if (!selecionados) {
        // Se selecionados estiver indefinido, não tenta desenhar o gráfico
        return;
      }

      const data = window.google.visualization.arrayToDataTable([
        ['Hora', 'Principal', 'Frios', 'Bebidas', 'Congelados'],
        ['00h', selecionados.Principal ? 1000 : null, selecionados.Frios ? 450 : null, selecionados.Bebidas ? 900 : null, selecionados.Congelados ? 100 : null],
        ['06h', selecionados.Principal ? 1170 : null, selecionados.Frios ? 460 : null, selecionados.Bebidas ? 750 : null, selecionados.Congelados ? 170 : null],
        ['12h', selecionados.Principal ? 800 : null, selecionados.Frios ? 1120 : null, selecionados.Bebidas ? 850 : null, selecionados.Congelados ? 660 : null],
        ['18h', selecionados.Principal ? 1030 : null, selecionados.Frios ? 540 : null, selecionados.Bebidas ? 400 : null, selecionados.Congelados ? 500 : null],
        ['23h59', selecionados.Principal ? 584 : null, selecionados.Frios ? 198 : null, selecionados.Bebidas ? 300 : null, selecionados.Congelados ? 400 : null],
      ]);

      const options = {
        // title: 'Temperatura',
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

      // Adiciona um event listener para redimensionar o gráfico
      window.addEventListener('resize', () => {
        chart.draw(data, options);
      });
    };

    // Limpa o event listener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', drawChart);
    };
  }, [selecionados]);

  // Define o tamanho do gráfico com base no viewport
  return (
    <div
      id="curve_chart">
    </div>
  );
};
export default GoogleChart;


