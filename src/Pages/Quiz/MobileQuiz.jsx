import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import miniLogo from '../../../src/images/miniLogo.png';
import SubmitModal from '../../components/ModalSubmit/Submit';
import TimerQuiz from '../../components/Timer/TimerQuiz';
import './MobileQuiz.scss';

const MobileQuiz = ({ client }) => {
  const [answer, setAnswer] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const navigate = useNavigate();
  const questionList = [...JSON.parse(localStorage.getItem('questionQuiz'))];
  const [current, setCurrent] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [checkRadio, setCheckRadio] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const answerOptions = ['A', 'B', 'C', 'D', 'E'];
  const numOfQuestion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    setCurrentQuestion(questionList[current]);
  }, [current]);

  const saveAnswerMobile = (current, index) => {
    const tempAnswer = [...answer];
    tempAnswer[current] = index + 1;
    setAnswer(tempAnswer);
    setCheckRadio(true);
  };

  const handleNextMobile = () => {
    setCurrent(current + 1);
    setCheckRadio();
  };

  const handleNavigate = () => {
    var result;
    localStorage.setItem('userAnswer', JSON.stringify(answer));
    result = {
      name: JSON.parse(localStorage.getItem('userQuiz')).name,
      studentID: JSON.parse(localStorage.getItem('userQuiz')).studentID,
      answer: JSON.parse(localStorage.getItem('userAnswer')),
    };
    client
      .put('/user/end', result)
      .then((res) => {
        navigate('/result');
      })
      .catch((e) => console.log(e));
  };
  console.log(answer);
  return (
    <div className='mobile_quiz'>
      <header className='mobile_header'>
        <div className='mobile_header_logo'>
          <img src={miniLogo} alt='Logo FCode' />
        </div>
        <div className='mobile_header_num'>
          {numOfQuestion.map((num, index) => (
            <div
              className='mobile_header_numItem'
              key={index}
              onClick={() => setCurrent(index)}
            >
              <a key={index} href='#'>
                Câu {num}
              </a>
            </div>
          ))}
        </div>
        <TimerQuiz handleNavigate={handleNavigate} />
      </header>
      <div className='mobile_body'>
        <p style={{ fontWeight: '700' }}>Câu {current + 1} :</p>
        <div className=''>
          {questionList[current].question.map((ques, index) =>
            JSON.stringify(ques).match('/images/[a-zA-Z0-9.]{1,}') ? (
              <img
                alt=''
                key={index}
                style={{ width: '100%' }}
                src={questionList[current].question[index]}
              />
            ) : (
              <div key={index}>{ques}</div>
            )
          )}
        </div>

        <div className='mobile_body_answer'>
          <form action=''>
            {questionList[current].multipleChoice.map((answer, index) => (
              <div className='mobile_body_answerItem' key={index}>
                <input
                  type='radio'
                  value={index}
                  name={`${questionList[current]._id}thanh`}
                  id={`${questionList[current]._id}_${index}thanh`}
                  onClick={() => {
                    saveAnswerMobile(current, index);
                  }}
                />
                <label
                  htmlFor={`${questionList[current]._id}_${index}thanh`}
                  className={`${checkRadio && 'active'}`}
                >
                  <div className='mobile_body_aphabet'>
                    <span>{answerOptions[index]}</span>
                  </div>
                  <div className='mobile_body_answerP'>{answer}</div>
                </label>
              </div>
            ))}
          </form>
        </div>
      </div>
      <footer className='mobile_footer'>
        <div>
          {current != questionList.length - 1 ? (
            <button onClick={handleNextMobile} className='mobile_btn'>
              Tiếp tục
            </button>
          ) : (
            <button
              onClick={() => setModalShow(true)}
              data-toggle='modal'
              data-target='#exampleModalCenter'
              className='mobile_btn'
            >
              Nộp bài
            </button>
          )}
        </div>
      </footer>{' '}
      <SubmitModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onClick={handleNavigate}
      />
    </div>
  );
};

export default MobileQuiz;
