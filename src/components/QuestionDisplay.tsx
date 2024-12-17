import React from 'react';
import { Alert } from 'react-bootstrap';
import { QuizQuestion } from '../quizData';
import AnswerButton from './AnswerButton';

interface QuestionDisplayProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  showFeedback: boolean;
  onAnswerSelected: (index: number) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  selectedAnswer,
  showFeedback,
  onAnswerSelected
}) => {
  return (
    <>
      <h2 className="h4 text-center mb-4">{question.question}</h2>
      <div className="d-grid gap-2 mb-4">
        {question.options.map((option, index) => (
          <AnswerButton
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            isCorrect={index === question.correctAnswer}
            showFeedback={showFeedback}
            onSelect={onAnswerSelected}
          />
        ))}
      </div>
      {showFeedback && (
        <Alert variant={selectedAnswer === question.correctAnswer ? "success" : "danger"}>
          <Alert.Heading>
            {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect!"}
          </Alert.Heading>
          <p>
            {selectedAnswer === question.correctAnswer
              ? "Great job! You got the right answer."
              : "Sorry, that's not correct. Try again!"}
          </p>
        </Alert>
      )}
    </>
  );
};

export default QuestionDisplay;

