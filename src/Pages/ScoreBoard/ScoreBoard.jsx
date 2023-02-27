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
        setListUsers(res.data.data.users);
        console.log(res.data);

        listUsers.map((item, index) =>
          item.studentID ==
          JSON.parse(localStorage.getItem('userQuiz')).studentID
            ? handleRankUser(item)
            : null
        );
      })
      .catch((e) => console.log(e));
  }, []);

  const handleRankUser = (item) => {
    localStorage.getItem('rankUser')
      ? setRankUser(JSON.parse(localStorage.getItem('rankUser')))
      : setRankUser(item.rank);
    localStorage.setItem('rankUser', JSON.stringify(rankUser));
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
        Bạn đang ở <span style={{ color: '#F9AF0B' }}>hạng {rankUser}</span>
      </p>
      <table className='scoreboard-table'>
        <tbody className='scoreboard-table-info'>
          <td>Top</td>
          <td>Họ tên</td>
          <td>MSSV</td>
          <td>Điểm</td>
          <td>Thời gian</td>
        </tbody>
        {listUsers.map((listUser, index) =>
          rankUser == listUser.rank ? (
            <tbody key={listUser._id} className='scoreboard-active'>
              <td>{listUser.rank}</td>
              <td>{listUser.name}</td>
              <td>{listUser.studentID}</td>
              <td>{listUser.score}</td>
              <td>{secondsToHms(listUser.time)}</td>
            </tbody>
          ) : (
            <tbody key={listUser._id}>
              <td>{listUser.rank}</td>
              <td>{listUser.name}</td>
              <td>{listUser.studentID}</td>
              <td>{listUser.score}</td>
              <td>{secondsToHms(listUser.time)}</td>
            </tbody>
          )
        )}
      </table>
    </div>
  );
};

export default ScoreBoard;
