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
          {/* <Barra /> */}
        
          <h1>Tela de suporte da ColdBox</h1>
        
        </>
        </div>
      );
}


