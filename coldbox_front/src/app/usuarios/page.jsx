'use client'
import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import GoogleChart from '../../components/GoogleChart/GoogleChart';
import Barra from '../../components/Barra/barra';
import styles from './page.css'
import Usuarios from '../../components/Usuarios/usuarioCadastrado'


export default function tempoReal() {
  return (
    <div className='bodyGrafico'>
        <NavBar />
      <div className='containerGrid'>
        <Barra />
        <Usuarios />
      </div>
    </div>
  );
}

