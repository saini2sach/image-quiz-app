import React from 'react';

import Option from './Option';
import Timer from './Timer';
import '../css/loader.css';


function MainContent(props) {
    const imageReady = props.imageUrl && props.imageLoaded;
    // Freeze the clock whenever the question isn't actively answerable:
    // while the image is loading, and during the post-answer feedback /
    // auto-advance window (showContinueBtn). So the timer only counts
    // real thinking time.
    const timerPaused = !imageReady || props.showContinueBtn;
    return (
        <div className="col-10 offset-1 main-content clearfix">
            <div className="col-lg-4 float-left item-image">
                {/* The <img> is mounted (hidden) as soon as we have a URL so it
                    can start downloading; we swap the loader for it only once
                    onLoad fires. onError also clears the loader so a broken
                    image can never freeze the game. */}
                { props.imageUrl &&
                    <img
                        src={props.imageUrl}
                        className="author-image"
                        alt="What is this?"
                        height="250px"
                        onLoad={props.onImageLoad}
                        onError={props.onImageLoad}
                        style={{ display: imageReady ? 'block' : 'none' }}
                    />
                }
                { !imageReady && <div className="loader"></div> }
            </div>
            <div className="float-left col-lg-2 timer-comp">
                <Timer totalSecs={props.timerLimit} showResult={props.showResult} paused={timerPaused}/>
            </div>
            { imageReady
                ? <div className="col-lg-5 float-right item-options">
                    {props.setOfAnswer.map( (item, index) => <Option item={item} key={index} enableContinueBtn={props.enableContinueBtn} answer={props.correctAnswer}/>)}
                  </div>
                : <div className="col-lg-5 float-right item-options option-loader">
                    <div className="loader"></div>
                  </div>
            }
        </div>
    )
}

export default MainContent;
