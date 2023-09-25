import { useQuestionsStore } from "../Store/questions"


// esto es un custom hooks
export const useQuestionsData = () => {
    //ACA SOLO SE ESTA MIRANDO DEL ESTADO QUE CADA QUE SE ACTUALICE EL ESTADO QUESTIONS LO AVISE
    const questions = useQuestionsStore(state => state.questions);

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach(question => {
        const { userSelectedAnswer, correctAnswer } = question
        if(userSelectedAnswer == null) unanswered++
        if(userSelectedAnswer === correctAnswer) correct++
        if(userSelectedAnswer !== correctAnswer) incorrect++
    })

    return { correct, incorrect, unanswered }
}