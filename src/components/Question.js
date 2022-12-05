import { useState } from "react"

export default ({ question, handleBack, handleSubmitAnswer }) => {
    const [answer, setAnswer] = useState('');
    const handleChangeAnswer = (e) => {
        setAnswer(e.target.value);
    }
    return(
        <div className="question-wrapper">
            <button className="back-btn" onClick={handleBack}>Back</button>
            <h3 className="question">{question ? question : 'Loading question'}</h3>
            <input className="answer" value={answer} onChange={handleChangeAnswer}/>
            <button className="submit-btn" onClick={() => handleSubmitAnswer(answer)}>Submit</button>
        </div>
    )
}