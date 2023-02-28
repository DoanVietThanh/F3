import React, { useEffect, useState } from 'react';
import './Result.scss';
import miniLogo from '../../../src/images/miniLogo.png';
import cup from '../../../src/images/cup.png';
import { Routes, Route, Link, NavLink } from 'react-router-dom';

const Result = ({ client }) => {
  let [score, setScore] = useState();
  let [time, setTime] = useState();

  useEffect(() => {
    client
      .get(`/user/${JSON.parse(localStorage.getItem('userQuiz')).studentID}`)
      .then((res) => {
        setScore(res.data.data.score);
        // setTime(Math.floor(res.data.data.time / 1000));
        setTime(secondsToHms(res.data.data.time));
        // localStorage.clear();
      })
      .catch((e) => console.log(e));
  }, []);

  const secondsToHms = (duration) => {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours > 0
      ? hours + ':' + minutes + ':' + seconds
      : minutes + ':' + seconds;
  };
  console.log(score, time);
  return (
    <div className='result-container'>
      <div className='logoResult'>
        <img src={miniLogo} alt='logo FCode' />
      </div>

      <div className='result-wrapper'>
        <div className='result-cup'>
          <img src={cup} alt='logo FCode' />
        </div>

        <div className='result-info'>
          <div className='logoResult2'>
            <img src={miniLogo} alt='logo FCode' />
          </div>

          <div className='result-info-title'>
            Chúc mừng bạn đã hoàn thành thử thách <span>IQ Challenge</span>
          </div>
          <p>Kết quả bạn đã đạt được :</p>

          <div className='result-achievement'>
            <div className='result-achievement-desc'>
              <span>Thời gian hoàn thành</span>
              <span style={{ color: '#33BD64' }}>{time} </span>
            </div>
            <div className='result-achievement-desc'>
              <span>Số câu trả lời đúng</span>
              <span style={{ color: '#33BD64' }}>{score} / 15</span>
            </div>
            <div className='result-achievement-desc'>
              <span>Vị trí xếp hạng</span>
              <Link
                to='/scoreboard'
                style={{ color: '#33BD64', textDecoration: 'none' }}
              >
                Xem BXH
              </Link>
            </div>
          </div>
          <div className='result-footer'>
            <p>Tìm hiểu thêm về CLB tại:</p>
            <a
              href='https://www.facebook.com/fcodefpt'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-facebook'></i>Facebook Fanpage F-Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
