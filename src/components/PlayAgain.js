import React from 'react';

function PlayAgain(props) {
    return (
        <div className="continue-btn-wrapper">
            <button className="continue-btn" onClick={(event) => { event.target.disabled = true; props.resetQuiz()}}>
                Play Again
            </button>
        </div>
    )
}

export default PlayAgain;