import React from 'react';

function Continue(props) {
    return (
        <div className="continue-btn-wrapper">
            <button className="continue-btn" onClick={(event) => { event.target.disabled = true; props.newPuzzle()}}>
                Continue
            </button>
        </div>
    )
}

export default Continue;