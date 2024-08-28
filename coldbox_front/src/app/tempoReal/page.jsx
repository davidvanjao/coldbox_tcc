import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import GoogleChart from '../../components/GoogleChart/GoogleChart';
import Barra from '../../components/Barra/barra';
import PaiRetangulos from '../../components/PaiRetangulos/PaiRetangulos'
import styles from './page.css'

export default function tempoReal() {
  return (
    <div className='body'>
      <NavBar />
      <div className='containerGrafico'>
        <Barra />
        <div className='graficoContainer'>
          <div className='headerGrafico'>Temperatura</div>
          <GoogleChart />
        </div>
        <div className='paiRetangulos'>
          <div className='graficoInformacoes'>
            Retângulo Maior
          </div>
        </div>
      </div>
    </div>
  );
}







