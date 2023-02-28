import React, { useEffect } from 'react';
import './ReadyQuiz.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import desktop3 from '../../../src/images/desktop3.png';
import miniLogo from '../../../src/images/miniLogo.png';
import { useNavigate } from 'react-router-dom';

const ReadyQuiz = ({ client, user, question, setQuestion }) => {
  const navigate = useNavigate();
  // console.log('testing: ', JSON.parse(localStorage.getItem('userQuiz')));
  useEffect(() => {
    client
      .post('/user/register', user)
      .then((res) => {
        toast.success('Login Successfully !', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((e) => {
        console.log(e);
        navigate('/result');
      });
  }, []);

  const handleNavigate = () => {
    var temp;
    client
      .get(`/user/start/${user.name}/${user.studentID}`)
      .then((response) => {
        toast.success('🦄 Wow so easy!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // console.log(response);
        temp = response.data.data.questions;
        localStorage.setItem('questionQuiz', JSON.stringify(temp));
        // console.log('temp: ', temp);
        setQuestion([...temp]);
        navigate('/quiz');
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className='desktop3'>
      <div className='desktop3_logo'>
        <img src={miniLogo} alt='' />
      </div>

      <div className='desktop3_container'>
        <img src={desktop3} className='desktop3_capture' alt='' />
        <div className='desktop3_info'>
          <img src={miniLogo} alt='' className='desktop3_logo2' />
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

export default ReadyQuiz;
