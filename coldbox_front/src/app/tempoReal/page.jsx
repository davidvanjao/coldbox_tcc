import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import dynamic from 'next/dynamic';

// Importa o GoogleChart dinamicamente e desativa o SSR
const GoogleChart = dynamic(() => import('../../components/GoogleChart/GoogleChart'), {
  ssr: false
});

export default function tempoReal() {
    return (
        <>
          <Head>
            <script src="https://www.gstatic.com/charts/loader.js"></script>
          </Head>
          <NavBar />
          <div style={{ marginLeft: '250px' }}> {/* Ajuste esse estilo conforme necessário */}
            <GoogleChart />
          </div>
        </>
      );
}


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


