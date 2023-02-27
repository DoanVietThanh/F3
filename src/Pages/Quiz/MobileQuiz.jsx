import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import miniLogo from '../../../src/images/miniLogo.png';
import SubmitModal from '../../components/ModalSubmit/Submit';
import Timer from '../../components/Timer/Timer';
import './MobileQuiz.scss';

const MobileQuiz = ({
  client,
  handleNavigate,
  answerOptions,
  numOfQuestion,
  answer,
  setAnswer,
}) => {
  const navigate = useNavigate();
  const questionList = [...JSON.parse(localStorage.getItem('questionQuiz'))];
  const [current, setCurrent] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [checkRadio, setCheckRadio] = useState(false);
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

  console.log(questionList[current]);
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
              <a key={index} href={`#${index + 1}`}>
                Câu {num}
              </a>
            </div>
          ))}
        </div>
        <Timer />
      </header>

      <body className='mobile_body'>
        <p>Câu {current + 1} :</p>
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
              <div>{ques}</div>
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
                  name={questionList[current]._id}
                  id={`${questionList[current]._id}_${index}`}
                  onClick={() => {
                    saveAnswerMobile(current, index);
                  }}
                />
                <label
                  htmlFor={`${questionList[current]._id}_${index}`}
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
      </body>

      <footer className='mobile_footer'>
        <div>
          {current != questionList.length - 1 ? (
            <button onClick={handleNextMobile} className='mobile_btn'>
              Tiếp tục
            </button>
          ) : (
            <button onClick={handleNavigate} className='mobile_btn'>
              Nộp bài
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default MobileQuiz;
