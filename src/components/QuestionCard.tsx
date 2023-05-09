import { FC } from 'react';
import { Button } from 'react-bootstrap';
//types
import { AnswerObject } from '../App';

interface QuestionCard {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: FC<QuestionCard> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      {/* Didn't understood that */}
      <p dangerouslySetInnerHTML={{ __html: question }} />
      {answers.map((answer) => {
        return (
          <div key={answer}>
            <Button
              disabled={userAnswer ? true : false}
              onClick={(e) => callback(e)}
              className="w-50"
              value={answer}
              style={
                userAnswer?.correctAnswer === answer
                  ? {
                      background: '#6fba56',
                      margin: '2%',
                    }
                  : userAnswer?.answer === answer
                  ? {
                      background: 'red',
                      margin: '2%',
                    }
                  : {
                      background: '#56ccff',
                      margin: '2%',
                    }
              }
            >
              <div dangerouslySetInnerHTML={{ __html: answer }}></div>
            </Button>
          </div>
        );
      })}
    </div>
  );
};
export default QuestionCard;
