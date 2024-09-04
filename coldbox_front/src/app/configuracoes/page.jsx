'use client'
import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import Barra from '../../components/Barra/barra';
import styles from './page.css'

export default function Configuracoes() {
  return (
    <div className='bodyContainer'>
      <NavBar />
      <div className='containerGrid'>
        <Barra />
      </div>
    </div>
  );
}


