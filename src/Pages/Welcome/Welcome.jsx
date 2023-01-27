import React from 'react';
import logo from '../../../src/images/logoFcode.png';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import './Welcome.scss';
const Welcome = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/home');
  };
  return (
    <div>
      <div className='welcome'>
        <img src={logo} className='welcome_logo' alt='logo' />
        <div className='welcome_para'>
          Chào mừng các bạn tân sinh viên K18 đến với <br />
          <span className='welcome_iq'>IQ Challenge</span> do CLB F-Code tổ chức
        </div>
        <button className='welcome_btn' onClick={handleNavigate}>
          BẮT ĐẦU
        </button>
      </div>
    </div>
  );
};

export default Welcome;
