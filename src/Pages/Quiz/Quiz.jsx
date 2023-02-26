import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import miniLogo from '../../../src/images/miniLogo.png';
import SubmitModal from '../../components/ModalSubmit/Submit';
import Timer from '../../components/Timer/Timer';
import './Quiz.scss';
import logo from '../../../src/images/miniLogo.png';
import MobileQuiz from './MobileQuiz';

const Quiz = ({ client }) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [active, setActive] = useState('');
  const [answer, setAnswer] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const answerOptions = ['A', 'B', 'C', 'D', 'E'];
  const numOfQuestion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const saveAnswer = (indexQuestion, index) => {
    const tempAnswer = [...answer];
    tempAnswer[indexQuestion] = index + 1;
    setAnswer(tempAnswer);
  };

  const handleNavigate = () => {
    var result;
    localStorage.setItem('userAnswer', JSON.stringify(answer));
    result = {
      name: JSON.parse(localStorage.getItem('userQuiz')).name,
      studentID: JSON.parse(localStorage.getItem('userQuiz')).studentID,
      answer: JSON.parse(localStorage.getItem('userAnswer')),
    };
    console.log('result : ', result);
    client
      .put('/user/end', result)
      .then((res) => {
        console.log(res);
        navigate('/result');
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      {' '}
      <div className='challenge'>
        {/* Challenge Navbar */}
        <div className='challenge_logo'>
          <img src={logo} alt='logo' />
        </div>

        <div className='challenge_nav'>
          <div className='challenge_nav_logo'>
            <img src={miniLogo} alt='Logo FCode' />
          </div>
          <div className='challenge_nav_timer'>
            <h2>Thời gian</h2>
            <Timer />
          </div>

          <div className='challenge_nav_numQuestion'>
            <h2>Câu hỏi</h2>
            <div className='challenge_nav_numItem'>
              {numOfQuestion.map((num, index) => (
                <div style={{ margin: '10px 0' }}>
                  <a
                    key={index}
                    href={`#${index + 1}`}
                    className={`${answer[index] && 'active'}`}
                  >
                    {num}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setModalShow(true)}
            className=''
            data-toggle='modal'
            data-target='#exampleModalCenter'
          >
            Nộp bài
          </button>
          <div className='challenge_nav_end'>
            Kiểm tra bài làm kĩ trước khi nộp
          </div>
        </div>

        {/* Challenge Questions */}
        <div className='challenge_questions'>
          {JSON.parse(localStorage.getItem('questionQuiz')).map(
            (item, indexQuestion) => (
              <div
                key={indexQuestion}
                className='challenge_questions_container'
                id={indexQuestion + 1}
              >
                <div className='challenge_questions_content'>
                  <div className='challenge_questions_number'>
                    Câu hỏi số {indexQuestion + 1}
                  </div>
                  <div className='challenge_questions_title'>
                    {item.question[0]}
                  </div>
                  {item.question[1] && (
                    <img src={`${item.question[1]}`} alt='' />
                  )}
                </div>

                <div className='challenge_questions_options'>
                  <form action=''>
                    {item.multipleChoice.map((answer, index) => (
                      <div
                        className='challenge_questions_item'
                        key={index}
                        onClick={() => setActive('active')}
                      >
                        <input
                          type='radio'
                          value={index}
                          name={item._id}
                          id={`${item._id}${index}`}
                          onClick={() => saveAnswer(indexQuestion, index)}
                        />
                        <label
                          htmlFor={`${item._id}${index}`}
                          className='challenge_questions_label'
                        >
                          <div>{answerOptions[index]} </div>
                          {answer}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              </div>
            )
          )}
          <p className='challenge_questions_end'>Kết thúc phần bài làm</p>
        </div>

        <SubmitModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onClick={handleNavigate}
        />
      </div>
      <MobileQuiz client={client} handleNavigate={handleNavigate} />
    </>
  );
};

export default Quiz;
