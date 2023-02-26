import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../src/images/logoFcode.png';
import './Welcome.scss';
const Welcome = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const navigate = useNavigate();
  return (
    <div className='welcome'>
      <img src={logo} className='welcome_logo' alt='logo' />
      <div className='welcome_para'>
        Chào mừng các bạn tân sinh viên K18 đến với <br />
        <span className='welcome_iq'>IQ Challenge</span> do CLB F-Code tổ chức
      </div>
      <button className='welcome_btn' onClick={() => navigate('/home')}>
        BẮT ĐẦU
      </button>
    </div>
  );
};

export default Welcome;
