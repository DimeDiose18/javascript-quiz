import {Button } from '@mui/material'
import { useQuestionsStore } from './Store/questions'

const LIMIT_QUESTIONS =  15;

export const Start = () => {
    const fecthQuestions = useQuestionsStore(state => state.fetchQuestions)

    
    const handleClick = () => {
        fecthQuestions(LIMIT_QUESTIONS) //se actualiza el estado llamando a la funcion
    }
    return (
        <Button onClick={handleClick} sx={{marginTop: '16px'}} variant='contained'>
            !Empezar!
        </Button>    
        )
}