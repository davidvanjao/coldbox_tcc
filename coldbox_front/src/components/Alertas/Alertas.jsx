import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';import styles from './Alertas.css'

export default function Alerta(){
    return(
        <div className="alertaContainer">
            <div className='barraAlerta'>
                <FontAwesomeIcon icon={faTriangleExclamation} style={{marginLeft: '10px' , fontSize: '18px'}} />
                <span className='tag'>Alerta</span>
            </div>
        </div>
    )
}