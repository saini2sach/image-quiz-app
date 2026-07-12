
import React from 'react';

const Option = (props) => {
    const handleClick = (event, item) => {
        const obj = event.target;
        const isAnswerCorrect = (item === props.answer);
        obj.classList.add(isAnswerCorrect ? 'green' : 'red');

        const allOptionsObj = document.querySelectorAll('.item-options .option');
        for(var itemObj of allOptionsObj) {
            itemObj.disabled = true;
            // Always reveal the correct option in green so the user learns
            // the right answer even after picking a wrong one.
            if(itemObj.dataset.answer === props.answer) {
                itemObj.classList.add('green');
            }
        }
        props.enableContinueBtn(isAnswerCorrect);
    }
    return (
        <button className="option" data-answer={props.item} onClick={(event) => handleClick(event, props.item)}>
            {props.item.replace(/_/g, " ")}
        </button>
    )
}

export default Option;