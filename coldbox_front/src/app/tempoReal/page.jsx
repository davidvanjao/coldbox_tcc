'use client'
import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import GoogleChart from '../../components/GoogleChart/GoogleChart';
import Barra from '../../components/Barra/barra';
import styles from './page.css'
import Alerta from '@/components/Alertas/Alertas';
import CamarasEAtivos from '@/components/CamarasEAtivos/CamarasEAtivos';

export default function tempoReal() {
  return (
    <div className='bodyContainer'>
      <NavBar />
      <div className='containerGrid'>
        <Barra />
        <GoogleChart />
        <CamarasEAtivos />
        <Alerta />
      </div>
    </div>
  );
}


