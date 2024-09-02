"use client"; // Marca o componente como um Client Component
import { useEffect } from 'react';
import styles from './GoogleChart.css';

const GoogleChart = () => {
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
      </div>
      <div
        id="curve_chart"
        style={{ width: '100%', height: '100%' }}
      ></div>
    </div>
  );
};

export default GoogleChart;
