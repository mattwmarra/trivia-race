import { auth, provider } from '../firebase';
import './start.scss'
const Start= ({user, startGame, quizState}) => {
  return (
      <div className='start'>
            <h2>Answer as many random trivia questions as you can before the timer runs out!</h2>
            <h2>Try to get to the top of the leaderboard!</h2>
            {!user ? 
            <LoginButton /> 
            :
            <button onClick={startGame} hidden={quizState !== "waiting"} 
              className="start-button">Start</button>
          }
      </div>
  )
}

const LoginButton = () => {
    const login = () => {
      auth.signInWithPopup(provider)
    }
    return (
      <button className="start-button" onClick={login}>Sign in with Google</button>
    )
  }

export default Start