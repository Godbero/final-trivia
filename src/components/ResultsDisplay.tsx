import React from 'react';
import { Button } from 'react-bootstrap';

interface ResultsDisplayProps {
  score: number;
  totalQuestions: number;
  onRestartGame: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  score,
  totalQuestions,
  onRestartGame
}) => {
  return (
    <div className="text-center">
      <h2 className="h3 mb-4">Quiz Completed!</h2>
      <p className="lead mb-4">Your final score: {score}/{totalQuestions}</p>
      <p>
        {score === totalQuestions
          ? "Perfect score! You're a true Schitt's Creek expert!"
          : score >= totalQuestions * 0.8
          ? "Great job! You really know your Schitt's Creek!"
          : score >= totalQuestions * 0.6
          ? "Not bad! You've got a good grasp of Schitt's Creek."
          : "Looks like you might need to rewatch some episodes!"}
      </p>
      <Button onClick={onRestartGame} size="lg">Play Again</Button>
    </div>
  );
};

export default ResultsDisplay;

