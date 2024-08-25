import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


// Importa useRouter apenas no lado cliente de forma dinâmica
const useRouter = dynamic(() => import('next/router').then(mod => mod.useRouter), {
    ssr: false
  });
    
const NavBarComponent = () => {
  const router = useRouter();
  console.log("Current path:", router.pathname); // Isso vai ajudar a verificar o que está sendo retornado

  const isActive = (pathname) => {
    return router.pathname === pathname;
  };
  
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
                <li className={isActive('/tempoReal') ? 'activeMenuItem' : ''}>
                    <Link href='/tempoReal'>Tempo Real</Link>
                </li>
                <li className={isActive('/relatorios') ? 'activeMenuItem' : ''}>
                    <Link href='/relatorios'>Relatórios</Link>
                </li>
                <li className={isActive('/dispositivos') ? 'activeMenuItem' : ''}>
                    <Link href='/dispositivos'>Dispositivos</Link>
                </li>
                <li className={isActive('/parametros') ? 'activeMenuItem' : ''}>
                    <Link href='/parametros'>Parâmetros</Link>
                </li>
                <li className={isActive('/usuarios') ? 'activeMenuItem' : ''}>
                    <Link href='/usuarios'>Usuários</Link>
                </li>
                <li className={isActive('/suporteColdBox') ? 'activeMenuItem' : ''}>
                    <Link href='/suporteColdBox'>Suporte ColdBox</Link>
                </li>
            </ul>
        </nav>
        <div className='logout'>
            <Link href="/login" className='logoutLink'>
                <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'inherit' }}/>Logout
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


