import React, { useEffect, useState} from "react";
import axios from "axios";
import './localDispositivos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const LocalDispositivos = () => {
    const [locais, setLocais] = useState([]);
    const [exibirModal, setExibirModal] = useState(false); //Estado p/ controlar o modal
    const [novoLocal, setNovoLocal] = useState({
        local_nome: '',
        local_descricao: '',
    });

    // pegando o cli_id do localStorage
    const cli_id = localStorage.getItem('cli_id');

    //requisição para buscar os locais cadastrados, puxando o cli_id do localStorage
    useEffect(() => {
        if (cli_id) {
            axios.get(`http://127.0.0.1:3333/local/${cli_id}`)
                .then(response => {
                    setLocais(response.data.dados) //Atualizando os dados recebidos
                })
                .catch(error => {
                    console.error('Erro ao buscar os dados da API:', error);
                });
        }
    }, [cli_id]);

    //Função para lidar com o preenchimento dos campos do modal
    const lidarComMudanca = (evento) => {
        const { name, value } = evento.target;
        setNovoLocal((prev) => ({ ...prev, [name]: value }));
    };

    //Requisição para adcionar uma nova localização
    const adicionarLocal = () => {
        if (novoLocal.local_nome && novoLocal.local_descricao) {
            axios.post('http://127.0.0.1:3333/local', {
                ...novoLocal,
                cli_id: cli_id, //Incluindo o cli_id que vem do localStorage    
            })
            .then(() => {
                setExibirModal(false) //Fechar o modal se cadastrar o novo local
                setLocais([...locais, { ...novoLocal, cli_id}]);
            })
            .catch((error) => {
                console.error('Erro ao adcionar uma nova localização:', error);
            });
        } else {
            alert ('Por favor, preencha todos os campos!');
        }
    }

    return (
        <div className='containerTabela'>
            <div className='cabecalhoTabela'>
                <span className='titulo'>Locais Ativos</span>
                    {/* Adicionando o botão para abrir o modal */}
                    <button 
                        className='botaoAdicionarLocal' 
                        onClick={() => setExibirModal(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Adicionar Local
                    </button>
            </div>
            <div className='tabelaLocais'>
                <table className='tabela'>
                    <thead>
                        <tr>
                            <th className='coluna'>Localização/Nome da Câmara</th>
                            <th className='coluna'>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locais.map((local) => (
                            <tr key={local.local_id} className='linha'>
                                <td className='celula'>{local.local_nome}</td>
                                <td className='celula'>{local.local_descricao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para adicionar a nova localização */}
            {exibirModal && (
                <div className='sobreposicaoModal'>
                    <div className='conteudoModal'>
                        <h2 className='tituloModal'>Adicionar Nova Localização</h2>
                        <p className="descricaoModal">Adicione uma nova localização para a criação de um novo dispositivo</p>
                        <div className='camposLocalizacao'>
                            <label htmlFor="local_nome">Nome do Local:</label>
                            <input
                                type="text"
                                name="local_nome"
                                id="local_nome"
                                value={novoLocal.local_nome}
                                onChange={lidarComMudanca}
                                required
                            />
                        </div>

                        <div className='camposLocalizacao'>
                            <label htmlFor="local_descricao">Descrição do Local:</label>
                            <input
                                name="local_descricao"
                                id="local_descricao"
                                value={novoLocal.local_descricao}
                                onChange={lidarComMudanca}
                                required
                            />
                        </div>

                        <div className='acoesModal'>
                        <button onClick={() => setExibirModal(false)} className='botaoCancelar'>
                            Cancelar
                        </button>
                        <button onClick={adicionarLocal} className='botaoAdicionar'>
                            Adicionar
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocalDispositivos;