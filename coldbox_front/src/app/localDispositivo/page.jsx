'use client'
import Image from 'next/image';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import styles from './page.css';
import Barra from '../../components/Barra/barra';

export default function localDispositivo() {
  return (
    <div className='bodyLocal'>
        <NavBar />
      <div className='containerGridLocal'>
        <Barra />
      </div>
    </div>
  );
}





