import React, { useEffect, useState} from "react";
import axios from "axios";
import './localDispositivos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';


const LocalDispositivos = () => {
    const [locais, setLocais] = useState([]);
    const [exibirModal, setExibirModal] = useState(false); //Estado p/ controlar o modal
    const [editando, setEditando] = useState(false); //Estado apara editar um local
    const [localSelecionado, setLocalSelecionado] = useState(null); //Armazena o local que esta sendo editado
    const [novoLocal, setNovoLocal] = useState({
        local_nome: '',
        local_descricao: '',
    });

    //Pegando o cli_id do localStorage
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

    //Função para limpar o formulario
    const limparFormulario = () => {
        setNovoLocal({
            local_nome: '',
            local_descricao: '',
        });
        setEditando(false);
        setLocalSelecionado(null);
    };

    //Requisição para adcionar uma nova localização
    const adicionarLocal = () => {
        if (novoLocal.local_nome && novoLocal.local_descricao) {
            axios.post('http://127.0.0.1:3333/local', {
                ...novoLocal,
                cli_id: cli_id, //Incluindo o cli_id que vem do localStorage    
            })
            .then(() => {
                setLocais([...locais, { ...novoLocal, cli_id}]);
                setExibirModal(false); //Fechar o modal se cadastrar o novo local
                limparFormulario();
            })
            .catch((error) => {
                console.error('Erro ao adcionar uma nova localização:', error);
            });
        } else {
            alert ('Por favor, preencha todos os campos!');
        }
    };
    
    //Abrir o modal para editar com os dados do local já carregados
    const editarLocal = (local) => {
        setNovoLocal({ 
            local_nome: local.local_nome, 
            local_descricao: local.local_descricao
        });
        setLocalSelecionado(local.local_id); //Armazenando o local_id
        setEditando(true); 
        setExibirModal(true);
    };

    //Função para fechar o modal e resetar o estado
    const fecharModal = () => {
        setExibirModal(false);
        limparFormulario();//Limpar os dados ao fechar o modalç
    }

    // const fecharModal = () => {
    // setExibirModal(false);
    // setEditando(false); // Redefine o estado de edição
    // setLocalSelecionado(null); // Limpa o local selecionado
    // setNovoLocal({ local_nome: '', local_descricao: '' }); // Limpa os campos do formulário
    // };

    //Requisição para atualizar a localização
    const atualizarLocal = () => {
        if (novoLocal.local_nome && novoLocal.local_descricao && localSelecionado) {
            alert('Perfil atualizado com sucesso');
            console.log('Perfil atualizado com sucesso');
            axios.patch(`http://127.0.0.1:3333/local/${localSelecionado}`, {
                local_nome: novoLocal.local_nome,
                local_descricao: novoLocal.local_descricao,
                cli_id: cli_id, //Incluindo do localStorage
            })
            .then(() => {
                setExibirModal(locais.map(local =>
                    local.local_id === localSelecionado ? { ...local, ...novoLocal} : local
                ));
                fecharModal(); //Fecha o modal após atualizar o local
            })
            .catch((error) => {
                console.error('Erro ao atualizar a localização:', error);
            });
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    };

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
                                <td className='celula'>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        className='iconeEditar'
                                        onClick={() => editarLocal(local)} //Chama a função para editar o local
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para adicionar a nova localização */}
            {exibirModal && (
                <div className='sobreposicaoModal'>
                    <div className='conteudoModal'>
                        <h2 className='tituloModal'>
                            {editando ? 'Editar Localização' : 'Adicionar Nova Localização'}
                        </h2>
                        <p className="descricaoModal">
                            {editando ? 'Atualize as informações da localização' : 'Adicione uma nova localização para a configuração de um novo dispositivo'}
                        </p>
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
                            <button onClick={editando ? atualizarLocal : adicionarLocal} className='botaoAdicionar'>
                                {editando ? 'Atualizar' : 'Adicionar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocalDispositivos;