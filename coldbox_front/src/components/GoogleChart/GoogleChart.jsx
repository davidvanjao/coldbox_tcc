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


  //! Função para calcular o período baseado na opção selecionada
  const calcularPeriodo = (opcao) => {
    const hoje = new Date();
    const inicioDiaAtual = new Date(hoje);
    inicioDiaAtual.setHours(0, 0, 0, 0); // Define o início do dia atual

    let dataInicio;
    let dataFim = hoje.toISOString().split("T")[0];

  
    switch (opcao) {
      case "24h":
        dataInicio = inicioDiaAtual.toISOString().split("T")[0]; // Usa o início do dia atual
        break;
      case 'semana':
        dataInicio = new Date(hoje.setDate(hoje.getDate() - 7)).toISOString().split('T')[0];
        break;
      case 'mes':
        dataInicio = new Date(hoje.setMonth(hoje.getMonth() - 1)).toISOString().split('T')[0];
        break;
      case 'ano':
        dataInicio = new Date(hoje.setFullYear(hoje.getFullYear() - 1)).toISOString().split('T')[0];
        break;
      default:
        dataInicio = dataFim; // Caso padrão, usa apenas a data atual
    }
  
    return { dataInicio, dataFim };
  };

  const calcularEixoHorizontal = (opcao) => {
    const hoje = new Date();
    const horas = [];
    const dias = [];
    const meses = [];
  
    switch (opcao) {
      case '24h': // Últimas 24 horas
        for (let i = 0; i < 24; i += 2) {
          const hour = i.toString().padStart(2, '0') + ":00";
          horas.push(hour);
        }
        return horas;
  
      case 'semana': // Esta semana
        for (let i = 6; i >= 0; i--) {
          const dia = new Date(hoje);
          dia.setDate(dia.getDate() - i);
          const diaFormatado = `${dia.getDate().toString().padStart(2, '0')}-${(dia.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`; // Formato DD-MM
          dias.push(diaFormatado);
        }
        return dias;

      case 'mes': // Este mês
      const diasNoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate(); // Dias no mês atual
      for (let i = 1; i <= diasNoMes; i++) {
        const diaFormatado = `${i.toString().padStart(2, '0')}-${(hoje.getMonth() + 1).toString().padStart(2, '0')}`;
        dias.push(diaFormatado);
      }
        return dias;
  
      case 'ano': // Este ano
      for (let i = 0; i < 12; i++) {
        meses.push(new Date(hoje.getFullYear(), i, 1)); // Adiciona o primeiro dia de cada mês
      }
        return meses;
      
      
  
      default:
        return []; // Caso nenhuma opção válida seja selecionada
    }
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
  const buscarDadosEquipamento = async (equip_id, periodo) => {
    try {
      const { dataInicio, dataFim } = periodo;
      console.log(`Buscando dados para o equipamento ${equip_id} com período:`, { dataInicio, dataFim });
  
      const response = await axios.get(`http://127.0.0.1:3333/dados/web/${equip_id}`, {
        params: { dataInicio, dataFim },
      });
  
      return response.data.dados;
    } catch (error) {
      console.error(`Erro ao buscar dados do equipamento ${equip_id}:`, error);
      return [];
    }
  };
  

  //! Função Principal - busca e organiza os dados de todos os equipamentos para o grafico
  const buscarDadosGrafico = async () => {
    const periodo = calcularPeriodo(opcaoSelecionada); // Calcula o período baseado na opção
    const eixoHorizontal = calcularEixoHorizontal(opcaoSelecionada); // Define os pontos no eixo horizontal

    try {
        const equipamentos = await buscarEquipamentos();
        const dadosGraficoArray = [
            [opcaoSelecionada === '24h' ? 'Hora' : 'Dia', ...equipamentos.map((equip) => equip.local_nome)],
        ];

        const dadosTemp = {};

        for (const equipamento of equipamentos) {
            const dados = await buscarDadosEquipamento(equipamento.equip_id, periodo);

            console.log(`Dados retornados para o equipamento ${equipamento.local_nome}:`, dados);

            dadosTemp[equipamento.local_nome] = {};

            if (opcaoSelecionada === '24h') {
                // Agrupar dados em intervalos de 2 horas do dia atual
                dados.forEach((item) => {
                    const dataISO = item.data_hora.split(' ')[0]; // Data no formato YYYY-MM-DD
                    if (dataISO === periodo.dataInicio) { // Garantir que os dados sejam apenas do dia atual
                        const hora = Math.floor(item.hora / 2) * 2; // Ex.: 15 -> 14
                        const horaFormatada = hora.toString().padStart(2, '0') + ":00";
                        if (!dadosTemp[equipamento.local_nome][horaFormatada]) {
                            dadosTemp[equipamento.local_nome][horaFormatada] = [];
                        }
                        dadosTemp[equipamento.local_nome][horaFormatada].push(parseFloat(item.media_temperatura));
                    }
                });
            } else if (opcaoSelecionada === 'semana') {
                // Agrupar dados por dia
                dados.forEach((item) => {
                    const dataISO = item.data_hora.split(' ')[0]; // Data no formato YYYY-MM-DD
                    const diaFormatado = `${dataISO.split('-')[2]}-${dataISO.split('-')[1]}`; // Formato DD-MM
                    if (!dadosTemp[equipamento.local_nome][diaFormatado]) {
                        dadosTemp[equipamento.local_nome][diaFormatado] = [];
                    }
                    dadosTemp[equipamento.local_nome][diaFormatado].push(parseFloat(item.media_temperatura));
                });
            } else if (opcaoSelecionada === 'mes') {
                // Agrupar dados por dia
                dados.forEach((item) => {
                    const dataISO = item.data_hora.split(' ')[0]; // Data no formato YYYY-MM-DD
                    const diaFormatado = `${dataISO.split('-')[2]}-${dataISO.split('-')[1]}`; // Formato DD-MM
                    if (!dadosTemp[equipamento.local_nome][diaFormatado]) {
                        dadosTemp[equipamento.local_nome][diaFormatado] = [];
                    }
                    dadosTemp[equipamento.local_nome][diaFormatado].push(parseFloat(item.media_temperatura));
                });
            } else if (opcaoSelecionada === 'ano') {
                // Agrupar dados por mês
                dados.forEach((item) => {
                    const dataISO = item.data_hora.split(' ')[0]; // Data no formato YYYY-MM-DD
                    const mes = parseInt(dataISO.split('-')[1], 10) - 1; // Mês como índice (0-11)
                    const ano = parseInt(dataISO.split('-')[0], 10); // Ano como número
                    const chaveMes = new Date(ano, mes, 1); // Cria chave de agrupamento no formato Date
                    if (!dadosTemp[equipamento.local_nome][chaveMes]) {
                        dadosTemp[equipamento.local_nome][chaveMes] = [];
                    }
                    dadosTemp[equipamento.local_nome][chaveMes].push(parseFloat(item.media_temperatura));
                });
            }
        }

        // Calcular as médias para cada ponto no eixo horizontal
        eixoHorizontal.forEach((ponto) => {
            const linha = [ponto];
            equipamentos.forEach((equipamento) => {
                const valores = dadosTemp[equipamento.local_nome]?.[ponto] || []; // Usar 'ponto' como chave
                const media =
                    valores.length > 0 ? (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2) : null;
                linha.push(media !== null ? parseFloat(media) : null);
            });
            dadosGraficoArray.push(linha);
        });

        console.log('Dados formatados para o gráfico:', dadosGraficoArray);
        setDadosGrafico(dadosGraficoArray);
    } catch (error) {
        console.error('Erro ao buscar dados para o gráfico:', error);
    }
};

  

  //!Carrega o script do Google Charts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js'; //URL do Google Charts
    script.async = true;
    script.onload = () => {
      window.google.charts.load('current', { 
        packages: ['corechart'],
        language: 'pt'
      });
      window.google.charts.setOnLoadCallback(() => setGoogleChartsCarregado(true)); //Marca como carregado
    };
    document.body.appendChild(script); //Adiciona o script ao documento
  }, []);

  //!Atualiza o gráfico a cada minuto
  useEffect(() => {
    buscarDadosGrafico(); //Carrega os dados inicialmente

    const intervalo = setInterval(() => {
      buscarDadosGrafico(); //Atualiza os dados a cada minuto - 60000
    }, 300000); // 10000 milissegundos = 10 segundos Valor para testes

    return () => clearInterval(intervalo); //Limpa o intervalo quando o componente for desmontado
  }, [opcaoSelecionada]);

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

      // Aplica o formatador para cada coluna de temperatura existente
      if (dadosGrafico.length > 0) {
        const numeroDeColunas = dadosGrafico[0].length; // Número de colunas no cabeçalho

        for (let i = 1; i < numeroDeColunas; i++) {
          formatador.format(data, i); // Formata cada coluna de temperatura
        }
      }


      const options = {
        legend: { position: 'right', alignment: 'center', legend: 'none' },
        colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'], //Define as cores das linhas
        hAxis: {
          title: opcaoSelecionada === '24h' ? 'Hora' : 'Dia',
          ticks: opcaoSelecionada === 'mes' 
            ? calcularEixoHorizontal('mes').map((dia, index) => ({
                v: index + 1, // O índice do dia (começando de 1)
                f: dia.split('-')[0] // Apenas o número do dia
              }))
            : null,
          gridlines: { count: opcaoSelecionada === 'ano' ? 12 : (opcaoSelecionada === 'mes' ? 31 : 12) },
          textStyle: { fontSize: 12 } // Ajusta o estilo do texto
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
        pointSize: 5, // Define o tamanho das bolinhas nos pontos

      };

      const chart = new window.google.visualization.LineChart(
        document.getElementById('curve_chart')
      );
      chart.draw(data); //!Desenha o gráfico com os dados e opções -- ADI
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
            <select 
              className='selecionarPeriodo' 
              value={opcaoSelecionada} 
              onChange={(e) => setOpcaoSelecionada(e.target.value)}
            >
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

