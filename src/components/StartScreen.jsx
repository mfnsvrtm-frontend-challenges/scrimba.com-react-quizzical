import React from 'react';

export default function StartPage({startQuiz}) {
    return (
        <main className="start-screen">
            <h1 className="start-screen-title">Quizzical</h1>
            <button onClick={startQuiz} className="start-screen-button">Start quiz</button>
        </main>
    )
}