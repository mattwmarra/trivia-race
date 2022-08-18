import Countdown from 'react-countdown';

function Quiz({question, answers, updateScore, score, time, setQuizState}) {
    //cleans up the string from unicode characters
  const cleanUpString = (string) => {
      string = string.replace(/&quot;/g, '\"');
      string = string.replace(/&#039;/g, "\'");
      string = string.replace(/&rsquo;/g, "\'");
      //&rsquo;
      return string;
    }
    return (
        <div className="">
          <p className="question">{cleanUpString(question)}</p>
          <div className="answers">
            {answers.answers?.map((answer, index) => {     
              const isCorrect = (index === answers.correctIndex) ? true : false;           
              return(
              <button className="trivia-button" 
              key={index} 
              isCorrect={isCorrect} 
              onClick={() => updateScore(index)}>{cleanUpString(answer)}</button>)
            })
          }
          </div>
          <Countdown date={time} precision={3} intervalDelay={0} onComplete={() => setQuizState("finished")} renderer={props => TimeRenderer(props)}/>
    </div>
    )
}   

const TimeRenderer = ({total}) => {
    return (
        <div className="timer">
            <div className="remaining" style={{width: (total/30000)*100 + "%"}}></div>
        </div>
    )
}


export default Quiz;
