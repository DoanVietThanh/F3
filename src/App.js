import axios from 'axios';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import ReadyQuiz from './Pages/ReadyQuiz/ReadyQuiz';
import Result from './Pages/Result/Result';
import Welcome from './Pages/Welcome/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScoreBoard from './Pages/ScoreBoard/ScoreBoard';
import NotFound from './Pages/NotFound/NotFound';
import TestQuiz from './Pages/Quiz/TestQuiz';
function App() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [question, setQuestion] = useState();

  const user = JSON.parse(localStorage.getItem('userQuiz')) || {
    name: name,
    studentID: id,
  };

  const client = axios.create({
    baseURL: 'https://iqapi.hdang09.site',
  });

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route
          path='/home'
          element={
            <Home
              client={client}
              user={user}
              name={name}
              setName={setName}
              id={id}
              setId={setId}
            />
          }
        />
        <Route
          path='/ready'
          element={
            <ReadyQuiz
              client={client}
              user={user}
              question={question}
              setQuestion={setQuestion}
            />
          }
        />
        <Route
          path='/quiz'
          element={
            <Quiz
              client={client}
              // user={user}
              // question={question}
              // setQuestion={setQuestion}
            />
          }
        />
        <Route path='/result' element={<Result client={client} />} />
        <Route path='/scoreboard' element={<ScoreBoard client={client} />} />
        <Route path='/test' element={<TestQuiz />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
