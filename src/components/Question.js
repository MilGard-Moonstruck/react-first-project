import { useState } from "react"
import {
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'

export default ({ question, handleBack, handleSubmitAnswer }) => {
    const [answer, setAnswer] = useState('');
    const handleChangeAnswer = (e) => {
        setAnswer(e.target.value);
    }
    return(
        <div className="question-wrapper">
            <button className="back-btn" onClick={handleBack}>Back</button>
            <h3 className="question">{question ? question : 'Loading question'}</h3>
            <FormControl>
                <FormLabel>Your Answer</FormLabel>
                <Input type='text' onChange={handleChangeAnswer}/>
            </FormControl>
            <button className="submit-btn" onClick={() => handleSubmitAnswer(answer)}>Submit</button>
        </div>
    )
}