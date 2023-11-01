export default function QuizAnswer({id, text, quizItem, onClick, quizState}) {
    let stateClass;
    if (quizState === 'completed') {
        if (quizItem.rightId === id) {
            stateClass = 'right';
        } else {
            stateClass = quizItem.selectedId === id ? 'wrong' : 'checked';
        }
    } else {
        stateClass = quizItem.selectedId === id ? 'selected' : '';
    }
    
    return (
        <button 
            className={`quiz-answer ${stateClass}`}
            onClick={quizState === 'completed' ? undefined : onClick}
        >
            {text}
        </button>
    )
}