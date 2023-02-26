import React from 'react';
import './NotFound.scss';
import logo from '../../../src/images/logoFcode.png';

const NotFound = () => {
  return (
    <div className='notfound'>
      <img src={logo} alt='' />
      <p className='notfound_info'>Not Found This Page !!</p>
    </div>
  );
};

export default NotFound;
