import { useEffect } from "react";

function Results({score, startGame}) {
    return (
        <div className="results">
            {
                // text and score</h2>
                // submit score btton
                // play again button
            }
            <h2><span className="highlight">Time's</span> Up!</h2>
            <h3>You scored <span className="highlight">{score}</span> points!</h3>
            <button className="start-button" onClick={ startGame }> Play Again</button>
        </div>
    )
}   


export default Results;
