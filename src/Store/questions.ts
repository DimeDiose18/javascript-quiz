import { create } from 'zustand';
import { type Question } from '../types';
import confetti from 'canvas-confetti';
import { persist } from 'zustand/middleware'; //captura los cambios que quieras hacer en el store al localstorage
import data from '../data.json'
//import { getAllQuestions } from '../services/questions';


interface State {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
[x: string]: any; //explicar el estado
questions: Question[]
currentQuestion: number
fetchQuestions: (limit: number) => void //metodo
selectAnswer: (questionsId: number, answerIndex: number) => void
goNextQuestion: () => void
goPreviusQuestion: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => { 
    //<--- el get recupera o escucha el estado global
    return {
        //formas de actualizar el estado
        questions: [], // <------- este estado global se actualiza con el questions del fetch
        currentQuestion: 0,// <--- posicion actual del array de questions
        
        
        fetchQuestions: (limit: number) => {
            const json = data
 
            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
           
            set({questions})
            
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            
            const {questions} = get();
            //usar el structuredClone para clonar el objeto
            const newQuestions = structuredClone(questions); // <-- lo que se hace es clonar todas las preguntas
            // encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex((q:{id:number}) => q.id === questionId);
            //obtenemos la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex];
            //averiguamos si el usuario ha seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
            //si es la correcta lanzamos confetti
            if(isCorrectUserAnswer) confetti();           
            //cambiar la informacion en la copia de la pregunta

            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            };

             //actualizar el estado

             set({questions: newQuestions})
            
        },

        goNextQuestion: () => {
            const {currentQuestion, questions} = get();
            const nextQuestion = currentQuestion + 1;

            if( nextQuestion < questions.length){
                set({ currentQuestion: nextQuestion })
            }
        },

        goPreviusQuestion: () => {
            const { currentQuestion } = get();
            const previusQuestion = currentQuestion - 1;

            if(previusQuestion >= 0){
                set({ currentQuestion: previusQuestion })
            }
        },

        reset: () => {
            set({ currentQuestion: 0, questions: [] })
        }
    }
        
}, {
    name: 'questions', // toca darle un apodo
    getStorage: () => localStorage
    //y aca se puede guardar en otro lugar que no sea el default LocalStorage
}))