import React, { useEffect, useState } from 'react';
import './ScoreBoard.scss';
import miniLogo from '../../../src/images/miniLogo.png';

const ScoreBoard = ({ client }) => {
  let [listUsers, setListUsers] = useState([]);
  let [rankUser, setRankUser] = useState();

  useEffect(() => {
    client
      .get('/user/scoreboard')
      .then((res) => {
        // console.log(res.data.data.users);
        setListUsers(res.data.data.users);
        res.data.data.users.map((item, index) =>
          item.studentID ==
          JSON.parse(localStorage.getItem('userQuiz')).studentID
            ? handleRankUser(item)
            : null
        );
      })
      .catch((e) => console.log(e));
  }, []);

  const handleRankUser = (item) => {
    setRankUser(item.rank);
    localStorage.setItem('rankUser', JSON.stringify(item.rank));
  };

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

  return (
    <div className='scoreboard'>
      <div className='scoreboard-logo'>
        <img src={miniLogo} alt='Logo FCode' />
      </div>
      <p className='scoreboard-heading'>
        Bảng xếp hạng <span style={{ color: '#33BD64' }}>IQ Challenge</span>
      </p>
      <p className='scoreboard-rank'>
        Bạn đang ở{' '}
        <span style={{ color: '#F9AF0B' }}>
          hạng {localStorage.getItem('rankUser')}
        </span>
      </p>
      <table className='scoreboard-table'>
        <thead className='scoreboard-table-info'>
          <tr>
            <th>Top</th>
            <th>Họ tên</th>
            <th>MSSV</th>
            <th>Điểm</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((listUser, index) =>
            rankUser == listUser.rank
              ? listUser.time && (
                  <tr key={listUser._id} className='scoreboard-active'>
                    <td>{listUser.rank}</td>
                    <td>{listUser.name}</td>
                    <td>{listUser.studentID}</td>
                    <td>{listUser.score}</td>
                    <td>{secondsToHms(listUser.time)}</td>
                  </tr>
                )
              : listUser.time && (
                  <tr key={listUser._id}>
                    <td>{listUser.rank}</td>
                    <td>{listUser.name}</td>
                    <td>{listUser.studentID}</td>
                    <td>{listUser.score}</td>
                    <td>{secondsToHms(listUser.time)}</td>
                  </tr>
                )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
