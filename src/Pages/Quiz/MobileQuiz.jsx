import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import miniLogo from '../../../src/images/miniLogo.png';
import SubmitModal from '../../components/ModalSubmit/Submit';
import Timer from '../../components/Timer/Timer';
import './MobileQuiz.scss';

const MobileQuiz = ({ client, handleNavigate }) => {
  const navigate = useNavigate();
  const questionList = [...JSON.parse(localStorage.getItem('questionQuiz'))];
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const answerOptions = ['A', 'B', 'C', 'D', 'E'];
  const numOfQuestion = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    setCurrentQuestion(questionList[current]);
  }, [current]);

  const handleNext = () => {
    setCurrent(current + 1);
  };

  return (
    <div className='mobile-quiz'>
      <header className='mobile-header'>
        <div className='mobile_logo'>
          <img src={miniLogo} alt='Logo FCode' />
        </div>

        <div className='mobile_num'>
          {numOfQuestion.map((num, index) => (
            <div
              className='mobile_num_item'
              key={index}
              style={{ width: '50px' }}
            >
              <a
                key={index}
                href={`#${index + 1}`}
                className={`${answer[index] && 'active'}`}
              >
                Câu {num}
              </a>
            </div>
          ))}
        </div>
        <div>Timer</div>
      </header>

      <body className='mobile-body'>
        <p>{questionList[current].question[0]}</p>
        {questionList[current].question[1] && (
          <img
            src={`${questionList[current].question[1]}`}
            alt=''
            style={{ maxWidth: '90vw' }}
          />
        )}
        <div className='challenge_questions_options'>
          <form action=''>
            {questionList[current].multipleChoice.map((answer, index) => (
              <div className='challenge_questions_item' key={index}>
                <input
                  type='radio'
                  value={index}
                  name={questionList[current]._id}
                />
                <label htmlFor={``} className='challenge_questions_label'>
                  <span>{answerOptions[index]} .</span> {answer}
                </label>
              </div>
            ))}
          </form>
        </div>
      </body>

      <footer>
        <div className='mobile-footer'>
          {current != questionList.length - 1 ? (
            <button onClick={handleNext} className='mobile_btn'>
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
