import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { quizQuestions } from './quizData';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsDisplay from './components/ResultsDisplay';

type GameState = 'start' | 'playing' | 'results';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setGameState('results');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(((currentQuestionIndex + 2) / quizQuestions.length) * 100);
      resetQuestionState();
    }
  };

  const handlePreviousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setScore(prevScore => Math.max(0, prevScore - 1));
      setProgress(((currentQuestionIndex) / quizQuestions.length) * 100);
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleRestartGame = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setScore(0);
    setProgress(0);
    resetQuestionState();
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-primary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card>
              <Card.Header className="text-center">
                <h1 className="h3 mb-0">{"You Don't Know Jack Schitt's Creek"}</h1>
              </Card.Header>
              <Card.Body>
                {gameState === 'start' && (
                  <div className="text-center">
                    <p className="lead">Welcome to the ultimate Schitt's Creek quiz!</p>
                    <p>Test your knowledge with {quizQuestions.length} challenging questions.</p>
                    <Button onClick={handleStartGame} size="lg">Start Quiz</Button>
                  </div>
                )}

                {gameState === 'playing' && (
                  <>
                    <QuestionDisplay
                      question={currentQuestion}
                      selectedAnswer={selectedAnswer}
                      showFeedback={showFeedback}
                      onAnswerSelected={handleAnswer}
                    />

                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Game Progress:</span>
                        <span>Score: {score}/{quizQuestions.length}</span>
                      </div>
                      <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
                    </div>

                    <div className="d-flex justify-content-between">
                      <Button 
                        variant="secondary" 
                        onClick={handlePreviousQuestion} 
                        disabled={isFirstQuestion}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="warning" 
                        onClick={handleRestartGame}
                      >
                        Home/Reset
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleNextQuestion} 
                        disabled={!showFeedback}
                      >
                        {isLastQuestion ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </>
                )}

                {gameState === 'results' && (
                  <ResultsDisplay
                    score={score}
                    totalQuestions={quizQuestions.length}
                    onRestartGame={handleRestartGame}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

