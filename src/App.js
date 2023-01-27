import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import ReadyQuiz from './Pages/ReadyQuiz/ReadyQuiz';
import Welcome from './Pages/Welcome/Welcome';

function App() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const user = {
    name: name,
    studentID: id,
  };
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route
          path='/home'
          element={
            <Home
              user={user}
              name={name}
              setName={setName}
              id={id}
              setId={setId}
            />
          }
        />
        <Route path='/ready' element={<ReadyQuiz />} />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
