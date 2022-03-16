import { useEffect } from "react";
import {db, auth} from './firebase';
import {doc, setDoc} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';
import {useAuthState} from "react-firebase-hooks/auth";

function Results({score, startGame, user}) {
    const [leaders, loading] = useCollection(db.collection('leaderboard'))
    // const[user, userLoading] = useAuthState(auth);
    const submitScore = async () => {
        console.log({user})
        const docRef = await setDoc(doc(db, 'leaderboard', user.uid), {
            name: user.displayName,
            score: score
        })
        return docRef;
    }

    useEffect(() => {
        const ref = submitScore();
        console.log({ref})
    })
    return (
        <div className="results">
            <h2><span className="highlight">Time's</span> Up!</h2>
            <h3>You scored <span className="highlight">{score}</span> points!</h3>
            <button className="start-button" onClick={ startGame }> Play Again</button>
        </div>
    )
}   


export default Results;
