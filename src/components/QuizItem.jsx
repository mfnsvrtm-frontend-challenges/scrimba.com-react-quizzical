import React from 'react';

import QuizAnswer from './QuizAnswer';

export default function QuizItem({chooseAnswer, quizState, item}) {
    const answers = item.answers.map((answer, id) => 
        <QuizAnswer
            key={id}
            id={id}
            text={answer}
            quizItem={item}
            quizState={quizState}
            onClick={() => chooseAnswer(id)}
        />
    );
    
    return (
        <div className="quiz-item">
            <h2 className="quiz-question">{item.question}</h2>
            <div className="quiz-answers">
                {answers}
            </div>
        </div>
    )
}