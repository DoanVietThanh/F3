import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import desktop2 from '../../../src/images/desktop2.png';
import miniLogo from '../../../src/images/miniLogo.png';
import userApi from '../../api/userApi';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './Home.scss';

const Home = (props) => {
  const { user, name, setName, id, setId } = props;
  const [error, setError] = useState();
  const successMessage = '';
  const navigate = useNavigate();
  let errorMessage;

  const fetchRegister = async () => {
    try {
      const response = await userApi.post(user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    fetchRegister();
    navigate('/ready');
    // client
    //   .post('/user/register', user)
    //   .then((response) => {
    //     console.log(response.data);
    //     successMessage = response.data.message;
    //   })
    //   .catch((e) => {
    //     setError(true);
    //     errorMessage = e.response.data.message;
    //   });
  };

  return (
    <div className='desktop2'>
      <div className='desktop2_info'>
        <img src={miniLogo} alt='Logo FCode' />
        <p>Nhập MSSV của bạn</p>
        <p>
          Chấp nhận tham gia thử thách bằng cách điền mã số sinh viên và tra cứu
          kết quả sau khi hoàn thành
        </p>
        {error && (
          <ErrorMessage>
            Họ tên không trùng với MSSV đã đăng ký trước đó!
          </ErrorMessage>
        )}
        <input
          type='text'
          placeholder='NGUYEN VAN A'
          className='desktop2_input'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='SE180000'
          className='desktop2_input'
          onChange={(e) => setId(e.target.value)}
        />
        <button className='desktop2_btn' onClick={handleRegister}>
          TIẾP TỤC
        </button>
      </div>
      <div className='desktop2_capture'>
        <img src={desktop2} />
      </div>
      {!error && <p>{successMessage}</p>}
    </div>
  );
};

export default Home;
