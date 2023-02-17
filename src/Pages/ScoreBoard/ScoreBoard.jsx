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
            ? setRankUser(item.rank)
            : null
        );
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(listUsers);
  const secondsToHms = (d) => {
    d = Number(d);
    var min = Math.floor((d / 1000 / 60) << 0);
    var sec = Math.floor((d / 1000) % 60);
    var mDisplay = min < 10 ? `0${min}` : min;
    var sDisplay = sec < 10 ? `0${sec}` : sec;
    return `${mDisplay} : ${sDisplay}`;
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
        {listUsers.map((listUser, index) => (
          <tbody key={listUser._id}>
            <td>{listUser.rank}</td>
            <td>{listUser.name}</td>
            <td>{listUser.studentID}</td>
            <td>{listUser.score}</td>
            <td>{secondsToHms(listUser.time)}</td>
            {/* <td>{listUser.time}</td> */}
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ScoreBoard;
// listUser.time && (
//   <tbody key={listUser._id}>
//     <td>{listUser.rank}</td>
//     <td>{listUser.name}</td>
//     <td>{listUser.studentID}</td>
//     <td>{listUser.score}</td>
//     <td>{secondsToHms(listUser.time)}</td>
//     {/* <td>{listUser.time}</td> */}
//   </tbody>
// )
