import './App.css';
import './index.css'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, provider } from './firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import Countdown from 'react-countdown';
import Results from './Results';
import Leaderboard from './Leaderboard';
import Quiz from './Quiz';

/*
  -The quiz allots 45 seconds for the player to answer as many questions as they can
  -Each question has a starting maximum score of 300 points which can only be achieved 
  in the first second of answering a question.
    -Potentially: the maximum score is increased by 25 for every consecutive correct answer

  -After 6 seconds on a question, the maximum score you can get is 50 points.
  -You get 0 points for answering a question wrong
  The score is then placed onto the leaderboard if they are in the top 5
*/

function App() {
  const[user, loading] = useAuthState(auth);
  const [questions, setQuestions] = useState(null);
  const [score, setScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState({
    answers : [],
    correctIndex: 0
  })

  const [quizState, setQuizState] = useState("waiting"); //waiting -> running -> finished
  const [timeScore, setTimeScore] = useState(0);
  const [timer, setTimer] = useState(Date.now()); 
  const [questionTime, setQuestionTime] = useState(Date.now())
  const startGame = async () => {
    await getQuestions();
    setScore(0);
    setTimer(Date.now());
    setQuizState("running");
  }
  const getQuestions = async ()  => {
    let result = await axios("https://opentdb.com/api.php?amount=50&type=multiple");
    setQuestions(result.data.results);
  }
  const quizTime = 45000;
  const generateRandom = (max) => {
    return Math.floor(Math.random() * max);
  }
  const goToNextQuestion = () => {
    setQuestionTime(Date.now())
    if(!questions){return;}
    if(quizIndex < questions.length-1){
      setQuizIndex(quizIndex+1);
    }
    if(quizIndex === questions.length-1){
      setQuizState("waiting")
    }
    return;
  }
  const updateScore = (isCorrect) => {
    let now = Date.now();
    let timeToAnswer = now - questionTime;
    let random = generateRandom(7);
    let timeBonus = 300 - (timeToAnswer > 1500 ? 300 : 0)
    if(isCorrect === answers.correctIndex){
      setScore(score+300+timeBonus+random);
    }
    else {
      setScore(score <= 0 ? 0 : score-120-random);
    }
    goToNextQuestion();
    return;
  }


  useEffect(() => {
    const quizAnswers = questions?.[quizIndex].incorrect_answers.slice();
    const correctIndex = generateRandom(4);
    quizAnswers?.splice(correctIndex, 0, questions[quizIndex].correct_answer);
    setAnswers({
      answers: quizAnswers,
      correctIndex
    });
  }, [quizIndex, questions])
  console.log(user)
  return (
    <div className="App">
      <div className="justify-center">
          <main>
          <section className="quiz">

          <header className="header">
            <h1><span className="uppercase highlight">Trivia</span><br/> Race</h1>
          </header>
          {!user 
          ? <LoginButton/> 
          : <button onClick={startGame} hidden={quizState !== "waiting"} 
              className="start-button">Start</button>
          }
          {
            {
              'running': <Quiz 
                          question={questions?.[quizIndex].question} 
                          answers={answers} updateScore={updateScore}
                          score={score} 
                          setQuizState={setQuizState}
                          time={timer+quizTime}
                        />,
              'finished' : <Results 
                          score={score}
                          startGame={startGame}
                           />

          }[quizState]
        }
          </section>
            <Leaderboard quizState={quizState} score={score}/>
          </main>
        </div>
    </div>
  );
}

const LoginButton = () => {
  const login = () => {
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={login}>Sign in with Google</button>
  )
}

export default App;
