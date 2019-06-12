import './styles.scss';
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import camera from '../../assets/images/camera.svg';

export default function Header() {
  return (
    <header className="main-header">
      <div className="main-header-content">
        <Link to="/">
          <img src={logo} alt="Clone instagram" />
        </Link>

        <Link to="/new">
          <img src={camera} alt="Enviar publicação" />
        </Link>
      </div>
    </header>
  );
}
