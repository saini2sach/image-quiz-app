import React from 'react';

function Continue(props) {
    // The bar depletes over the same duration as the auto-advance timer in
    // ImageQuiz, giving a visual cue that the next puzzle is about to load.
    // It mounts exactly when the timer starts, so the two stay in sync.
    return (
        <div className="continue-btn-wrapper">
            <button className="continue-btn" onClick={(event) => { event.target.disabled = true; props.newPuzzle()}}>
                Continue
                <span className="continue-progress" aria-hidden="true">
                    <span
                        className="continue-progress-fill"
                        style={{ animationDuration: props.autoAdvanceMs + 'ms' }}
                    ></span>
                </span>
            </button>
        </div>
    )
}

export default Continue;
