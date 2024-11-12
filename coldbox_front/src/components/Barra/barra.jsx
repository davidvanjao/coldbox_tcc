'use client';
import styles from './barra.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BarraSuperior = () => {
  const [mostrarModal, setMostrarModal] = useState(false); 
  const [fotoPerfil, setFotoPerfil] = useState('/user.png'); 
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null); 
  const [nomeUsuario, setNomeUsuario] = useState(''); 
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState(''); 
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState(''); 
  const [nomeEmpresa, setNomeEmpresa] = useState(''); 
  const [senha, setSenha] = useState(''); 
  const [nivelAcesso, setNivelAcesso] = useState(''); 
  const [nivelId, setNivelId] = useState(''); 
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState(null); 

  //Busca o nome e ID do usuário no localStorage
  useEffect(() => {
    const nomeArmazenado = localStorage.getItem('userName');
    const idArmazenado = localStorage.getItem('userId');

    console.log('Nome do usuário no localStorage:', nomeArmazenado);
    console.log('ID do usuário no localStorage:', idArmazenado);

    
    if (nomeArmazenado) {
      setNomeUsuario(nomeArmazenado); //Define o nome do usuário
    }
    if (idArmazenado) {
      setUserId(idArmazenado); //Define o ID do usuário
    }

    //Função para buscar os dados do usuário e da empresa
    const buscarDadosUsuarioEmpresa = async () => {
      if (!idArmazenado) {
        console.error('ID do usuário não encontrado.');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:3333/usuarios/dadosUsuarioEmpresa/${idArmazenado}`);
        if (response.data.sucesso && response.data.dados.length > 0) {
          const { cli_razaoSocial, nivel_acesso, cli_id } = response.data.dados[0];

          //Define o nome da empresa e o nível de acesso
          setNomeEmpresa(cli_razaoSocial);
          setNivelAcesso(nivel_acesso);

          //Armazena o cli_id no localStorage
          localStorage.setItem('cli_id', cli_id);
        } else {
          console.error('Erro ao buscar dados do usuário e da empresa.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário e da empresa:', error);
      }
    };

    buscarDadosUsuarioEmpresa();
  }, []);

  //Abre o modal de edição do perfil e carrega os dados do usuário
  const abrirModalEdicao = async () => {
    setMostrarModal(true); //Exibe o modal

    if (!userId) {
      alert('ERRO: ID do usuário não encontrado.');
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:3333/usuarios/dadosUsuario/${userId}`);
      if (response.data.sucesso) {
        const { user_nome, user_email, user_tel, user_senha, nivel_id, user_status } = response.data.dados;

        //Separa o nome completo em nome e sobrenome
        const [primeiroNome, ...restante] = user_nome.split(' ');
        setNome(primeiroNome);
        setSobrenome(restante.join(' '));
        setEmail(user_email);
        setTelefone(user_tel);
        setSenha(user_senha);
        setNivelId(nivel_id); 
        setStatus(user_status);
      } else {
        alert('Erro ao buscar dados do usuário.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário', error);
    }
  };

  //Fecha o modal de edição
  const fecharModal = () => {
    setMostrarModal(false);
  };

  //Atualiza a imagem de perfil quando o usuário seleciona um novo arquivo
  const mudarFotoPerfil = (event) => {
    const arquivo = event.target.files[0];
    if (arquivo) {
      setArquivoSelecionado(arquivo);
      setFotoPerfil(URL.createObjectURL(arquivo)); 
    }
  };

  //Função para enviar a foto de perfil ao servidor
  const enviarFotoPerfil = async () => {
    console.log('userId antes de enviar a foto:', userId);

    if (!arquivoSelecionado || !userId) {
      
        alert('Selecione uma imagem.');
        return;
    }

    const formData = new FormData();
    formData.append('fotoPerfil', arquivoSelecionado);

    try {
        const response = await axios.post(`http://127.0.0.1:3333/usuarios/uploadFotoPerfil/${userId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 30000 // Timeout de 30 segundos para testes
        });

        console.log('Resposta da API recebida:', response);

        if (response.data.sucesso) {
            setFotoPerfil(response.data.imageUrl); 
            alert('Foto de perfil atualizada com sucesso!');
        } else {
            alert('Erro ao atualizar a foto de perfil.');
        }
    } catch (error) {
        console.error('Erro ao enviar a foto de perfil', error);
        alert('Ocorreu um erro ao enviar a foto de perfil. Tente novamente.');
    }
};


  //Salva as mudanças feitas no perfil
  const salvarAlteracoesPerfil = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('ERRO: ID do usuário não encontrado.');
      return;
    }

    const nomeCompleto = `${nome} ${sobrenome}`; //Combina nome e sobrenome

    const dadosAtualizados = {
      user_nome: nomeCompleto,
      user_email: email,
      user_tel: telefone,
      user_senha: senha,
      nivel_id: nivelId,
      user_status: status,
    };


    try {
            await enviarFotoPerfil(); // Envia a foto de perfil antes de salvar as informações

      //Requisição para atualizar o perfil do usuario
      const response = await axios.patch(`http://127.0.0.1:3333/usuarios/${userId}`, dadosAtualizados);
      if (response.data.sucesso) {
        alert('Perfil atualizado com sucesso');
        console.log('Perfil atualizado com sucesso');

        setNomeUsuario(nomeCompleto); //Atualiza o nome exibido na barra superior
        localStorage.setItem('userName', nomeCompleto); //Atualiza o nome no localStorage
        fecharModal(); //Fecha o modal
      } else {
        alert('Erro ao atualizar o perfil.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil', error);
    }
  };

  return (
    <div className='barraSuperior'>
      <div className='nomeEmpresa'>
        <h1>{nomeEmpresa || 'Empresa Desconhecida'}</h1>
        <div className='tagsInformacao'>
          <span className='tag'>Ambiente Refrigerado</span>
          <span className='tag'>MEGA2560</span>
          <span className='tag'>ESP8266</span>
        </div>
        <p>Atualizado agora mesmo</p>
      </div>

      <div className='perfilUsuario'>
        <div className='informacaoUsuario'>
          <img src={fotoPerfil} alt="Usuário" />
          <div>
            <h3>{nomeUsuario || 'Usuário'}</h3> {/* Exibe o nome recuperado ou 'Usuário' como fallback */}
            <span>{nivelAcesso || 'Nível de Acesso'}</span>
          </div>
        </div>
        <button className='botaoConfiguracao' onClick={abrirModalEdicao}>
          <FontAwesomeIcon icon={faGear} size='2x' className='iconeConfig' />
        </button>
      </div>

      {/* Renderiza o modal apenas quando mostrarModal for true */}
      {mostrarModal && (
        <div className="telaSobreposicao" onClick={fecharModal}>
          <div className="containerSobreposicao" onClick={(e) => e.stopPropagation()}>
            <h2>Editar Perfil</h2>

            {/* Área de edição da foto de perfil */}
            <div className="fotoDePerfil">
              <img src={fotoPerfil} alt="Foto de Perfil" className="imagemDePerfil" />
              <div className="sobreposicaoParaEditar">
                <input
                  type="file"
                  accept="image/*"
                  onChange={mudarFotoPerfil}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input" className="editarFotoDePerfil">
                  Alterar foto do perfil
                </label>
              </div>
            </div>

            {/* Formulário para editar os dados do perfil */}
            <form onSubmit={salvarAlteracoesPerfil}>
              <div className="formularios">
                <label htmlFor="nome">Nome:</label>
                <input 
                  type="text"  
                  id="nome" 
                  name="nome" 
                  placeholder="Seu nome" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="formularios">
                <label htmlFor="sobrenome">Sobrenome:</label>
                <input 
                  type="text" 
                  id="sobrenome" 
                  name="sobrenome" 
                  placeholder="Seu sobrenome" 
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  required
                />
              </div>

              <div className="formularios">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Seu email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="formularios">
                <label htmlFor="telefone">Número de Telefone:</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  placeholder="Seu número de telefone"
                  pattern="\d*"
                  inputMode="numeric"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} //Valida para aceitar apenas números
                  required
                />
              </div>

              <div className="botoesFecharSalvar">
                <button type="button" onClick={fecharModal}>Fechar</button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarraSuperior;
