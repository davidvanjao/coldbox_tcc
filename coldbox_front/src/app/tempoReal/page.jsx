import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import GoogleChart from '../../components/GoogleChart/GoogleChart';
import Barra from '../../components/Barra/barra';
import styles from './page.css'

export default function tempoReal() {
  return (
    <div className='body'>
      <>
        <NavBar />
        <Barra />
        <div className='retanguloGrafico'>
          <div className='graficoContainer'>
            <GoogleChart />
          </div>
        </div>
      </>
    </div>
  );
}
  






