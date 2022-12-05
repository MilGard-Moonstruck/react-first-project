import { useState, useEffect } from 'react';
import axios from 'axios';

import CategoryList from './components/CategoryList';
import Question from './components/Question';
import './App.css';

const CATEGORIES = [
  'random',
  'artliterature',
  'language',
  'sciencenature',
  'general',
  'fooddrink',
  'peopleplaces',
  'geography',
  'historyholidays',
  'entertainment',
  'toysgames',
  'music',
  'mathematics',
  'religionmythology',
  'sportsleisure',
];
const URL = 'https://api.api-ninjas.com/v1/trivia?category=';
const API_KEY = 'OwKei0Q6datQffwj4Qh5Mw==a3C5fP6uwGH21LSn';

function App() {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnser] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotificaiton] = useState('');
  
  const handleSelectCategory = (category) => {
    setIsLoading(true);
    setCategory(category);
  }

  useEffect(() => {
    fetchQuestion();
  }, [category]);

  const fetchQuestion = async () => {
    if (category) {
      setIsLoading(true);
      const { data } = await axios.get(`${URL}${category !== 'random' ? category : ''}`, {
        headers: {
          'X-Api-Key': API_KEY,
        }
      });
      if (data.length) {
        setQuestion(data[0].question);
        setCorrectAnser(data[0].answer);
      } else {
        setNotificaiton('Couldn\'t find question in selected category, please select other one');
        setCategory('');
      }
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setCategory('');
    setQuestion('');
    setCorrectAnser('');
  }

  const handleSubmitAnswer = (answer) => {
    const isCorrect = answer.toLowerCase().trim() === correctAnswer.toLowerCase();
    setIsAnswerCorrect(isCorrect);
    setShowNotification(true);
    setCategory('');
    setNotificaiton()
    const notificationContent = isCorrect ? 'Your answer was correct' : `Correct answer is ${correctAnswer}`;
    setNotificaiton(notificationContent)
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  }

  return (
    <div className="App">
      {showNotification ? <div className={`notification ${isAnswerCorrect? 'successNotification' : 'failNotification'}`}>
        <p>{notification}</p>
      </div> : null}
      <h3 className="title">WEB 2.5 TRIVIA</h3>
      {isLoading ? (<div className="loader">
        <p >LOADING...</p>
      </div>) : null}
      {
        category ? (
          <Question question={question} handleBack={handleBack} handleSubmitAnswer={handleSubmitAnswer}/>
        ) : (
          <CategoryList
            categories={CATEGORIES}
            handleSelectCategory={handleSelectCategory}
          />
        )
      }
    </div>
  );
}

export default App;
