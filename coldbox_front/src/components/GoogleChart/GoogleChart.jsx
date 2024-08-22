import { useEffect } from 'react';

function GoogleChart() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ativa o estado de cliente quando o componente monta
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);
    }

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Hora', 'Temperatura'],
        ['00h', 20],
        ['06h', 22],
        ['12h', 28],
        ['18h', 24],
        ['24h', 21],
      ]);

      var options = {
        title: 'Temperatura ao Longo do Dia',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: 'Hora do Dia' },
        vAxis: { title: 'Temperatura (°C)' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      chart.draw(data, options);
    }
  }, []);

  return <div id="curve_chart" style={{ width: '100%', height: '500px' }}></div>;
}

export default GoogleChart;
