import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import GoogleChart from '../../components/GoogleChart/GoogleChart';
// import Barra from '../../components/Barra/barra';
import styles from './page.css'
import Barra from '../../components/Barra/barra'

export default function relatorios() {
    return (
      <div className='bodyGrafico'>
        <>
          <NavBar />
         
          <Barra/>
         
        
        </>
        </div>
      );
}


