import React from 'react'

import StartPage from './components/StartScreen'
import QuizPage from './components/QuizScreen'

export default function App() {
    const [screen, setScreen] = React.useState('welcome-screen');
    const startQuiz = () => setScreen('quiz-screen');
    
    return (
        <main>
            {screen === 'welcome-screen' ? <StartPage startQuiz={startQuiz} /> : <QuizPage />}
        </main>
    )
}