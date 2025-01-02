import React from 'react';
import { Button } from 'react-bootstrap';

interface AnswerButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  onSelect: (index: number) => void;
}

const AnswerButton = ({
  option,
  index,
  isSelected,
  isCorrect,
  showFeedback,
  onSelect
}) => {
  const getVariant = () => {
    if (!showFeedback) return 'outline-primary';
    if (isSelected) return isCorrect ? 'success' : 'danger';
    return 'outline-primary';
  };

  return (
    <Button
      variant={getVariant()}
      onClick={() => onSelect(index)}
      disabled={showFeedback}
      className="text-start"
    >
      {String.fromCharCode(65 + index)}. {option}
    </Button>
  );
};

export default AnswerButton;

