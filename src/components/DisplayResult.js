
import React from 'react';

function DisplayResult(props) {
    const correctAnswer = props.resultList.filter( item => item === true ).length;
    const quesShouldAttempt = Math.floor(props.timerLimit / props.oneQuesAttemptTime);
    const efficiencyPerc = Math.floor((correctAnswer/props.resultList.length)*100);
    return (
        <div className="col-10 offset-1 main-content display-result" data-item={props.resultList}>
            <p>
                Your score : {correctAnswer} / {props.resultList.length}
            </p>
            <ul>
                <li className="win-lose">
                    { (efficiencyPerc >= 80) && (props.resultList.length > quesShouldAttempt)
                        ? <span className="winner-label">Congrats, You Won!</span>
                        : <span className="loser-label">You Lose ({(efficiencyPerc >= 80) ? " "+quesShouldAttempt +" - Questions should be attempted" : " As Accuracy is below 80%"})</span>
                    }
                </li>
                <li>Total time-frame - <b>{props.timerLimit} seconds.</b></li>
                <li>Total Questions Attempted - <b>{props.resultList.length}</b></li>
                <li>Correct Answer - <b>{correctAnswer}</b></li>
                <li>Accuracy - <b>{isNaN(efficiencyPerc) ? 0 : efficiencyPerc} %</b></li>
            </ul>
        </div>
    )
}

export default DisplayResult;