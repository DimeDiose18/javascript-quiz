// lo hermoso de zustant y como permitiendo crear el estado lo permite leer y utilizar de maneras muy chulas

import { Button } from "@mui/material"
import { useQuestionsData } from "./hooks/useQuestionsData"
import { useQuestionsStore } from "./Store/questions"

export const Footer = () => {
    const {correct, incorrect, unanswered} = useQuestionsData()

    const reset = useQuestionsStore(state => state.reset)

    return (
        <footer style={{marginTop: '16px'}}>
            <strong>{`✔️${correct} correctas - ❌${incorrect} incorrectas - ❓${unanswered} sin responder`}</strong>
            <div style={{marginTop: '16px'}}>
              <Button onClick={() => reset()} >
                Resetear juego
            </Button>  
            </div>
            
        </footer>
    )
}