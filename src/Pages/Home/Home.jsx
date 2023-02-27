import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import desktop2 from '../../../src/images/desktop2.png';
import miniLogo from '../../../src/images/miniLogo.png';
import './Home.scss';

const Home = ({ client, user, name, setName, id, setId }) => {
  const navigate = useNavigate();
  const handleRegister = () => {
    if (name.match('[a-z A-Z]$') && id.match('^SE[0-9]{6}$')) {
      localStorage.setItem('userQuiz', JSON.stringify(user));
      navigate('/ready');
    } else {
      toast.warn('Invalid Input', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    }
    // localStorage.setItem('userQuiz', JSON.stringify(user));
    // navigate('/ready');
  };

  return (
    <div className='home_container'>
      <div className='logo'>
        <img src={miniLogo} alt='Logo FCode' />
      </div>
      <div className='home'>
        <div className='home_info'>
          {/* <img src={miniLogo} alt='Logo FCode' /> */}
          <p className='home_info_heading'>
            Nhập <span>MSSV</span> của bạn
          </p>
          <p>
            Chấp nhận tham gia thử thách bằng cách điền mã số sinh viên và tra
            cứu kết quả sau khi hoàn thành
          </p>

          <input
            type='text'
            placeholder='NGUYEN VAN A'
            className='home_input'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            placeholder='SE180000'
            className='home_input'
            onChange={(e) => setId(e.target.value)}
          />
          <button
            className='home_btn'
            onClick={handleRegister}
            disabled={false}
          >
            tiếp tục
          </button>
        </div>
        <div className='home_capture'>
          <img src={desktop2} />
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <ToastContainer />
    </div>
  );
};

export default Home;
