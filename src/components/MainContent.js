import React from 'react';

import Option from './Option';
import Timer from './Timer';
import '../css/loader.css';


function MainContent(props) {
    return (
        <div className="col-10 offset-1 main-content clearfix">
            <div className="col-lg-4 float-left item-image">
                { props.imageUrl 
                    ? <img src={props.imageUrl} className="author-image" alt={props.correctAnswer} height="250px" />
                    : <div className="loader"></div>
                }
            </div>
            <div className="float-left col-lg-2 timer-comp">
                <Timer totalSecs={props.timerLimit} showResult={props.showResult}/>
            </div>
            { props.imageUrl 
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