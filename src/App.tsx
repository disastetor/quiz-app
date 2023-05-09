import { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { fetchQuizQuestions } from './API';

// Types
import { QuestionState, Difficulty } from './API';

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionCard from './components/QuestionCard';
import './style.sass';

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  // Start the game
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.HARD
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // Check if the answer is correct or not
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) {
      setScore((prev) => prev + 1);
    }
    //Create the answerObject
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    //Put the object into the array
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  // Go to the next question
  const nextQuestion = () => {
    // Move to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Container className="text-center position-relative vh-100">
        <Container className="h-75">
          <Row>
            <span className="h1" style={{ textTransform: 'uppercase' }}>
              Trivia
            </span>
          </Row>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <Button
              style={{ color: 'white' }}
              variant="info"
              className="w-25"
              onClick={() => startTrivia()}
            >
              Start
            </Button>
          ) : null}

          {loading && <p>Loading Questions...</p>}
          <Row className="text-center">
            <Container>
              {!loading && !gameOver && (
                <QuestionCard
                  questionNumber={number + 1}
                  totalQuestions={TOTAL_QUESTIONS}
                  question={questions[number].question}
                  answers={questions[number].answers}
                  userAnswer={userAnswers ? userAnswers[number] : undefined}
                  callback={checkAnswer}
                />
              )}

              {/* #TODO ADD PREVIOUS PAGES VISUALIZATION */}
              {/*             {!gameOver &&
              !loading &&
              number !== TOTAL_QUESTIONS - 1 &&
              userAnswers.length === number + 1 && (
                <Button
                  variant="success"
                  className="w-25"
                  onClick={() => setNumber((prev) => prev - 1)}
                >
                  Prev question
                </Button>
              )} */}

              {!gameOver &&
                !loading &&
                number !== TOTAL_QUESTIONS - 1 &&
                userAnswers.length === number + 1 && (
                  <Button
                    style={{ background: '#11658f' }}
                    className="w-auto"
                    onClick={() => nextQuestion()}
                  >
                    Next Question
                  </Button>
                )}
            </Container>
          </Row>
        </Container>
        <Container className="h-25">
          <Row className="" style={{ fontSize: '2em' }}>
            {!gameOver && !loading && <span>Score: {score}</span>}
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default App;
