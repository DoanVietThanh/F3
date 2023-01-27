import React from 'react';
import miniLogo from '../../../src/images/miniLogo.png';
import './Quiz.scss';

const Quiz = () => {
  return (
    <div className='desktop4'>
      <div className='desktop4_nav'>
        <div className='desktop4_nav_logo'>
          <img src={miniLogo} alt='Logo FCode' />
        </div>
        <div className='desktop4_nav_timer'>
          <h2>Thời gian</h2>
        </div>
        <div className='desktop4_nav_numQuestion'>
          <h2>Câu hỏi</h2>
        </div>
        <button>Nộp bài</button>
        <div>Kiểm tra bài làm kĩ trước khi nộp</div>
      </div>
      <div className='desktop4_list'></div>
    </div>
  );
};

export default Quiz;
