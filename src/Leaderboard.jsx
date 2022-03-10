import React from 'react'
import {db, auth} from './firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

function Leaderboard({quizState, score}) {
    const [leaders, loading] = useCollection(db.collection('leaderboard').limit(7).orderBy("score", "desc"));
    if(quizState === "running"){
        return (
            <div className="scoreboard">
                <h2 >Score</h2>
                <h2 className='highlight'>{score}</h2>
            </div>
        )
    }
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            
            {  
                !loading && leaders.docs.map((doc, index) => {
                    const data = doc.data();
                    return(
                        <div key={doc.id}>
                            <h4 className="name">{index+1}.) {data.name} : {data.score}pts</h4>
                            <hr/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Leaderboard
