
import React from 'react';

const Option = (props) => {
    const handleClick = (event, item) => {
        const obj = event.target;
        let isAnswerCorrect = false;
        if(item === props.answer) {
            obj.classList.add('green');
            isAnswerCorrect = true;
        }
        else {
            obj.classList.add('red');
        }
        const allOptionsObj = document.querySelectorAll('.item-options .option');
        for(var itemObj of allOptionsObj) {
            itemObj.disabled = true;
        }
        props.enableContinueBtn(isAnswerCorrect);
    }
    return (
        <button className="option" onClick={(event) => handleClick(event, props.item)}>
            {props.item.replace(/_/g, " ")}
        </button>
    )
}

export default Option;