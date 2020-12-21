import React from 'react';
import styles from './branding.module.css';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Branding: React.FC = () => {
  return (
    <Link to="/" className={styles.brand}>
      <img src={logo} alt="Interviews Logo" />
    </Link>
  )
}

export default Branding;
