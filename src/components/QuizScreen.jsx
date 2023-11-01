import React from 'react'

import PulseLoader from 'react-spinners/PulseLoader'

import QuizItem from './QuizItem'

import {decode} from 'html-entities'

export default function QuizPage() {
    const [quizItems, setQuizItems] = React.useState([]);
    const [quizState, setQuizState] = React.useState('in-progress');
    const [showPopup, setShowPopup] = React.useState(false);
    
    React.useEffect(() => {
        if (showPopup) setTimeout(() => setShowPopup(false), 5000);
    }, [showPopup])
    
    const mapAPIData = (quizItem, id) => {
        const answers = quizItem.incorrect_answers.map(decode);
        const rightId = Math.floor(Math.random() * answers.length);
        answers.splice(rightId, 0, decode(quizItem.correct_answer));
        
        return {
            id,
            question: decode(quizItem.question),
            answers,
            rightId,
            selectedId: null,
        }
    }
    
    React.useEffect(() => {
        if (quizState === 'completed') return;
        
        fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
            .then(response => response.json())
            .then(json => json.results.map(mapAPIData))
            .then(setQuizItems)
    }, [quizState])
    
    const chooseAnswer = (quizItemId, answerId) => {
        setQuizItems(prev =>
            prev.map(item =>
                item.id !== quizItemId ? item : {
                    ...item,
                    selectedId: answerId,
                }
            )
        )
    }
    
    const calculateScore = () => quizItems.filter(item => item.selectedId === item.rightId).length
    
    const checkAnswers = () => {
        const someQuestionsUnanswered = quizItems.some(item => item.selectedId === null);
        if (someQuestionsUnanswered) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
            setQuizState('completed');
        }
    }
    
    const playAgain = () => {
        setQuizState('in-progress');
        setQuizItems([]);
    }
    
    if (quizItems.length === 0) return <PulseLoader color="#4D5B9E" />;
    else return (
        <main className="quiz">
            <section className="primary">
                {quizItems.map(item =>
                    <QuizItem
                        key={item.id}
                        chooseAnswer={(answerId) => chooseAnswer(item.id, answerId)}
                        quizState={quizState}
                        item={item}
                    />
                )}
            </section>
            <footer>
                {showPopup && <div className="popup">You have unanswered questions. Make sure to give them an answer before proceeding.</div>}
                {quizState === 'completed' && <span className="score">You scored {calculateScore()}/{quizItems.length} correct answers</span>}
                {quizState === 'completed' ? 
                    <button onClick={playAgain}>Play again</button> :
                    <button onClick={checkAnswers}>Check answers</button>}
            </footer>
        </main>
    );
}