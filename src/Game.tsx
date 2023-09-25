//import { IconButton, Stack } from "@mui/material"
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { useQuestionsStore } from "./Store/questions";
import { type Question as QuestionType } from "./types";
import SyntaxHighLighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Footer } from "./Footer";

//fx que se crea una sola vez,no cada que se renderice
const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;

    //index es la respuesta que estamos mirando
    //si el usuario no ha seleccionado todavia nada
    if (userSelectedAnswer == null) return 'transparent'
    //si ya selecciono pero la solucion es incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    //si esta es la solucion correcta
    if (index === correctAnswer) return 'green'
    //si esta esla seleccion del usuario pero no es la correcta
    if (index === userSelectedAnswer) return 'red'
    //si es ninguna de las anteriores
    return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer);

    // funcion que devuelve  una funcion
    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex) //<-- esta en si es la del handlclick
    }



    return (
        <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighLighter lenguage='javascript' style={gradientDark}>
                {info.code}
            </SyntaxHighLighter>

            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            onClick={createHandleClick(index)} sx={{ backgroundColor: getBackgroundColor(info, index) }} >
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    )

}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions);
    const currentQuestion = useQuestionsStore(state => state.currentQuestion);
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion);
    const goPreviusQuestion = useQuestionsStore(state => state.goPreviusQuestion);

    const questionInfo = questions[currentQuestion]

    return (
        <>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
            <IconButton onClick={goPreviusQuestion} disabled={currentQuestion == 0}>
                <ArrowBackIosNew />
            </IconButton>

            {currentQuestion +1 } / {questions.length}

            <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                <ArrowForwardIos />
            </IconButton>
        </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}