import React, { useEffect } from "react";

export const Option = ({ option, selectedOption, correctAnswer, onClick, showResult }) => {
    const isCorrect = option === correctAnswer;
    const isChosen = selectedOption === option;
  
    const optionClass = showResult
      ? isCorrect
        ? 'option correct'
        : isChosen
        ? 'option wrong'
        : 'option'
      : 'option';
  
    return (
      <div className={optionClass} onClick={() => onClick(option)}>
        {option}
      </div>
    );
  };