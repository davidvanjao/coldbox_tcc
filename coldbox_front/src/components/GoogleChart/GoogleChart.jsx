"use client";
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import styles from './GoogleChart.css'; 

//A prop 'exportButton' renderizará o botão de exportação apenas quando necessário
const GoogleChart = ({ exportButton }) => {
  const [dadosGrafico, setDadosGrafico] = useState([]); //Estado para armazenar os dados do gráfico
  const [googleChartsCarregado, setGoogleChartsCarregado] = useState(false); //Estado para controlar o carregamento do Google Charts
  const [valorMaximo, setValorMaximo] = useState(0); //Estado para armazenar o valor máximo de temperatura
  const [exibirModalExportacao, setExibirModalExportacao] = useState(false); //Estado para controlar a visibilidade do modal de exportação
  const [exportarVisualizacaoAtual, setExportarVisualizacaoAtual] = useState(false); //Estado para controlar a checkbox de exportação de visualização atual
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('24h'); //Estado para o seletor de período

  //!Funções para abrir e fechar o modal de exportação
  const abrirModalExportacao  = () => {
    setExportarVisualizacaoAtual(false); //Resetar o estado da checkbox ao abrir o modal
    setExibirModalExportacao(true);
  };

  // Função para fechar o modal de exportação
  const fecharModalExportacao = () => {
    setExibirModalExportacao(false);
  };

  //Função de exportação de dados (no momento, apenas exibe um alerta)
  const exportarDados = (e) => {
    e.preventDefault(); //Evita o comportamento padrão do formulário de recarregar a página
    alert('Exportando dados...');
    fecharModalExportacao(); //Fecha o modal após a exportação
  };

  //Alterna o estado da checkbox "Exportar visualização atual"
  const alterarExportarVisualizacaoAtual  = () => {
    setExportarVisualizacaoAtual(!exportarVisualizacaoAtual);
  };

  //Atualiza o estado ao selecionar uma nova opção no seletor de período
  const alterarOpcaoSelecionada  = (event) => {
    setOpcaoSelecionada(event.target.value);
  };

  //Função para abreviar o nome dos equipamentos, pegando sempre a ultima palavra
  const abreviarNomeEquipamento = (nome) => {
      const palavras = nome.split(' '); //Divide o nome em palavras
      return palavras[palavras.length - 1]; //Retorna a ultima palavra
  };


  //! Função inicial, essa função vai listar todos os equipamentos vinculados a empresa atraves do cli_id e equip_id
  const buscarEquipamentos = async () => {
    try {
      const cli_id = localStorage.getItem('cli_id');
      const response = await axios.get(`http://127.0.0.1:3333/equipamento/${cli_id}`);
      return response.data.dados; //retorna a lista de equipamentos
    } catch (error) {
      console.error('Erro ao buscar equipamentos', error);
      return [];  
    }
  };

  //! Segunda função, ela irá buscar os dados de temperatura de cada equipamento
  const buscarDadosEquipamento = async (equip_id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3333/dados/web/${equip_id}`);
      return response.data.dados;
    } catch (error) {
      console.error('Erro ao buscar dados do equipamento ${equip_id}', error);
      return [];
    }
  };

  //! Função Principal - busca e organiza os dados de todos os equipamentos para o grafico
  const buscarDadosGrafico  = async () => {
    try {
      const equipamentos = await buscarEquipamentos(); // Buscando todos os equipamentos associados ao cli_id
      
      // Inicializa o array de dados com os cabeçalhos dinâmicos, uma coluna para cada equipamento
      const dadosGraficoArray = [['Hora', ...equipamentos.map(equip => equip.local_nome)]];

      // Obter as horas que serão usadas para todas as linhas
      const horas = Array.from({ length: 12 }, (_, index) => `${index + 1}:00`);

      //Cria um objeto pra armazenar as temperaturas por equipamento e hora
      const dadosTemp = {};

      //Faz uma requisição para cada equipamento e organiza os dados
      for (const equipamento of equipamentos) {
        const dados = await buscarDadosEquipamento(equipamento.equip_id);

        //Armazena os dados de temperatura para cada equipamento dentro do objeto
        dadosTemp[equipamento.local_nome] = {};
        dados.forEach((item) => {
          const hora = item.hora + ":00"; //Formatando a hora
          dadosTemp[equipamento.local_nome][hora] = parseFloat(item.media_temperatura);
        });
      }

      //Monta os dados do grafico
      horas.forEach((hora) => {
        const linha = [hora];
        equipamentos.forEach((equipamento) => {
          linha.push(dadosTemp[equipamento.local_nome][hora] || null);
        });
        dadosGraficoArray.push(linha);
      });

      setDadosGrafico(dadosGraficoArray); //Atualiza os dados do grafico
      
    } catch (error) {
      console.error('Erro ao buscar dados da API', error); // Exibe um erro no console se a requisição falhar
    }
  };

  //!Carrega o script do Google Charts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js'; //URL do Google Charts
    script.async = true;
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(() => setGoogleChartsCarregado(true)); //Marca como carregado
    };
    document.body.appendChild(script); //Adiciona o script ao documento
  }, []);

  //!Atualiza o gráfico a cada minuto
  useEffect(() => {
    buscarDadosGrafico(); //Carrega os dados inicialmente

    const intervalo = setInterval(() => {
      buscarDadosGrafico(); //Atualiza os dados a cada minuto - 60000
    }, 10000); // 10000 milissegundos = 10 segundos Valor para testes

    return () => clearInterval(intervalo); //Limpa o intervalo quando o componente for desmontado
  }, []);

  //!Desenha o gráfico quando os dados e o Google Charts estão prontos
  useEffect(() => {
    const desenharGrafico  = () => {
      if (!googleChartsCarregado  || dadosGrafico.length === 0) {
        return; //Se o script não estiver carregado ou não houver dados, não faz nada
      }

      const data = window.google.visualization.arrayToDataTable(dadosGrafico); //Converte os dados em formato do Google Charts

      //Definindo o formatter para adicionar "°C" e limitar a 1 casa decimal
      const formatador  = new window.google.visualization.NumberFormat({
        suffix: '°C',  //Sufixo que vai aparecer após o número
        fractionDigits: 0, //Limita a 1 casa decimal
      });

      //Aplica o formatador para cada coluna de temperatura no gráfico
      formatador.format(data, 1); // Formata a coluna de temperatura
      // formatador.format(data, 2); // Formata a coluna de umidade

      const options = {
        legend: { position: 'right', alignment: 'center', legend: 'none' },
        colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'], //Define as cores das linhas
        hAxis: {
          title: 'Hora',
          format: 'H:mm',
          gridlines: { count: 5 }
          // ticks: 
          //[
          //   { v: 2, f: '0h' }, //Rótulo da hora
          //   { v: 6, f: '6h' },
          //   { v: 12, f: '12h' },
          //   { v: 18, f: '18h' },
          //   { v: 23.9833, f: '23h59' } //Próximo de 24h
          // ],
          // gridlines: { count: 5 } //Quantidade de linhas de grade
        },
        vAxis: {
          title: 'Valores',
          viewWindow: { min: 0, max: valorMaximo + 5 },
          format: '#,##0'
          // viewWindow: { min: -10, max: 6 }, //Intervalo de temperatura (-4°C a 6°C)
          // format: '#,##0°C'
        },
        chartArea: {
          left: 70,
          width: '75%',
          height: '70%',
          right: 180,
        },
        tooltip: { isHtml: true }, //Habilita tooltips em HTML
      };

      const chart = new window.google.visualization.LineChart(
        document.getElementById('curve_chart')
      );
      chart.draw(data); //Desenha o gráfico com os dados e opções
    };

    if (googleChartsCarregado) {
      desenharGrafico();
    }

    window.addEventListener('resize', desenharGrafico); //Redesenha o gráfico ao redimensionar a janela
    return () => {
      window.removeEventListener('resize', desenharGrafico); //Remove o listener ao desmontar o componente
    };
  }, [googleChartsCarregado, dadosGrafico, valorMaximo]);

  return (
    <div className='contentGrafico'>
      <div className='headerGrafico'>
        <span className='tag'>Temperatura</span>

        {exportButton && ( //Renderiza o botão de exportação se 'exportButton' estiver ativo
          <>
            Botão para selecionar o periodo
            <select className='selecionarPeriodo' value={opcaoSelecionada} onChange={alterarOpcaoSelecionada}>
              <option value="24h">Últimas 24 horas</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="ano">Este Ano</option>
            </select>

            {/* Botão para abrir o modal de exportação */}
            <button className='botaoExportar' onClick={abrirModalExportacao}>
              Exportar Dados
            </button>
          </>
        )}
      </div>
      <div id="curve_chart"></div> {/* Onde o gráfico será renderizado */}

      {/* Modal para selecionar o período de exportação */}
      {exibirModalExportacao  && (
        <div className="telaSobreposta" onClick={fecharModalExportacao}>
          <div className="conteudoDaSobreposicao" onClick={(e) => e.stopPropagation()}>
            <h2>Exportar Dados</h2>

            <form>
              <div className="formularioData">
                <label htmlFor="dataInicio">Data de Início:</label>
                <input
                  type="date"
                  id="dataInicio"
                  name="dataInicio"
                  disabled={exportarVisualizacaoAtual} //Desabilita o campo se a checkbox estiver marcada
                  className={exportarVisualizacaoAtual ? "desabilitarCampo" : ""}
                />
              </div>

              <div className="formularioData">
                <label htmlFor="dataFim">Data de Fim:</label>
                <input 
                  type="date" 
                  id="dataFim" 
                  name="dataFim" 
                  disabled={exportarVisualizacaoAtual} 
                  className={exportarVisualizacaoAtual ? "desabilitarCampo" : ""}
                  required 
                />
              </div>

              <div className="containerCheckBox">
                <input 
                  type="checkbox"  
                  checkbox={exportarVisualizacaoAtual}
                  onChange={alterarExportarVisualizacaoAtual}
                />
                <label htmlFor="exportCheckbox" className="checkBoxLabel">
                  Exportar visualização atual
                </label>
              </div>

              {/* Botões para fechar e exportar */}
              <div className="botaoFecharExportar">
                <button type="fechar" onClick={fecharModalExportacao}>Fechar</button>
                <button type="exportar" onClick={exportarDados}>Exportar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleChart;

