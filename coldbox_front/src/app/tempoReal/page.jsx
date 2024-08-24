import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import GoogleChart from '../../components/GoogleChart/GoogleChart';
import Barra from '../../components/Barra/barra';

export default function tempoReal() {
    return (
        <>
          <Head>
            <script src="https://www.gstatic.com/charts/loader.js"></script>
          </Head>
          <NavBar />
          <Barra />
          <div style={{ marginLeft: '250px' }}> {/* Ajuste esse estilo conforme necessário */}
            <GoogleChart />
          </div>
          
        </>
      );
}




