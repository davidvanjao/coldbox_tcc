'use client'

// import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';



// Importa useRouter apenas no lado cliente de forma dinâmica
// const useRouter = dynamic(() => import('next/router').then(mod => mod.useRouter), {
//     ssr: false
// });

const NavBarComponent = () => {
    const router = useRouter();
    const routePath = usePathname();

    // Função do Logout
    const handleLogout = (e) => {
        e.preventDefault(); // Evita o comportamento padrão do link

        // Remover dados do localStorage (Nome do usuario, tokens, etc)
        localStorage.removeItem('userName'); // Remove o nome de usuario
        localStorage.removeItem('userId');   // Remove o ID do usuario
        localStorage.removeItem('cli_id');   // Remove o cli_id do usuário
        localStorage.clear(); // Isso garante que todo o localStorage seja limpo no logout

        // Adicione outras limpezas necessárias (por exemplo, tokens de autenticação)

        // Redirecionar para a página de login
        router.push('/login');
    }
    
    return (
        <div className='sidebar'>
            <div className='logo'>
                <img src="/logo.png" alt="ColdBox Logo" />
                <span>
                    <span className='textoBold'>Cold</span>Box
                </span>
            </div>
            <nav>
                <ul>
                    <li className={routePath === '/tempoReal' ? 'activeMenuItem' : ''}>
                        <Link href='/tempoReal'>Tempo Real</Link>
                    </li>
                    <li className={routePath === '/relatorios' ? 'activeMenuItem' : ''}>
                        <Link href='/relatorios'>Relatórios</Link>
                    </li>
                    <li className={routePath === '/dispositivos' ? 'activeMenuItem' : ''}>
                        <Link href='/dispositivos'>Dispositivos</Link>
                    </li>
                    <li className={routePath === '/parametros' ? 'activeMenuItem' : ''}>
                        <Link href='/parametros'>Parâmetros</Link>
                    </li>
                    <li className={routePath === '/usuarios' ? 'activeMenuItem' : ''}>
                        <Link href='/usuarios'>Usuários</Link>
                    </li>
                    <li className={routePath === '/configuracoes' ? 'activeMenuItem' : ''}>
                        <Link href='/configuracoes'>Configurações</Link>
                    </li>
                    <li className={routePath === '/suporteColdBox' ? 'activeMenuItem' : ''}>
                        <Link href='/suporteColdBox'>Suporte ColdBox</Link>
                    </li>
                </ul>
            </nav>
            <div className='logout'>
                <Link href="/login" className='logoutLink' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'inherit' }} />Logout
                </Link>

            </div>
        </div>
    );
};

export default NavBarComponent;

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <div className="logo">
//         <img src="/logo.png" alt="ColdBox Logo" />
//         <span>ColdBox</span>
//       </div>
//       <nav>
//         <ul>
//           <li><Link href="#"><a>Tempo Real</a></Link></li>
//           <li><Link href="#"><a>Relatórios</a></Link></li>
//           <li><Link href="#"><a>Dispositivos</a></Link></li>
//           <li><Link href="#"><a>Parâmetros</a></Link></li>
//           <li><Link href="#"><a>Usuários</a></Link></li>
//           <li><Link href="#"><a>Suporte ColdBox</a></Link></li>
//         </ul>
//       </nav>
//       <div className="logout">
//         <Link href="#"><a>Logout</a></Link>
//       </div>
//     </div>
//   );
// };


