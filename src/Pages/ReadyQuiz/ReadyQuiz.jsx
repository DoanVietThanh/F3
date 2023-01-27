import React from 'react';
import './ReadyQuiz.scss';
import desktop3 from '../../../src/images/desktop3.png';
import miniLogo from '../../../src/images/miniLogo.png';
import { useNavigate } from 'react-router-dom';

const ReadyQuiz = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/quiz');
  };
  return (
    <div className='desktop3'>
      <img src={desktop3} className='desktop3_capture' alt='' />
      <div className='desktop3_info'>
        <img src={miniLogo} alt='' />
        <div className='desktop3_para'>Chuẩn bị sẵn sàng</div>
        <ul className='desktop3_list'>
          <li className='desktop3_item'>
            <i className='far fa-clock desktop3_icon'></i>
            Bạn sẽ có 10’ để hoàn thành thử thách
          </li>
          <li className='desktop3_item'>
            <i className='fas fa-question-circle desktop3_icon'></i>
            Tổng cộng là 20 câu hỏi cần hoàn thành{' '}
          </li>
          <li className='desktop3_item'>
            <i className='fas fa-check-circle desktop3_icon'></i>
            Chỉ chọn một đáp án đúng duy nhất{' '}
          </li>
        </ul>
        <button className='desktop3_btn' onClick={handleNavigate}>
          bắt đầu thử thách
        </button>
      </div>
    </div>
  );
};

export default ReadyQuiz;
