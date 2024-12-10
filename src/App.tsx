import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import { quizQuestions, QuizQuestion } from "./quizData";

type GameState = "start" | "playing" | "results";

function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleStartGame = () => {
    setGameState("playing");
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
      setGameState("results");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestartGame = () => {
    setGameState("start");
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-primary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card>
              <Card.Header className="text-center">
                <h1 className="h3 mb-0">
                  {"You Don't Know Jack Schitt's Creek"}
                </h1>
              </Card.Header>
              <Card.Body>
                {gameState === "start" && (
                  <div className="text-center">
                    <p className="lead">
                      Welcome to the ultimate Schitt's Creek quiz!
                    </p>
                    <p>
                      Test your knowledge with {quizQuestions.length}{" "}
                      challenging questions.
                    </p>
                    <Button onClick={handleStartGame} size="lg">
                      Start Quiz
                    </Button>
                  </div>
                )}

                {gameState === "playing" && (
                  <>
                    <h2 className="h4 text-center mb-4">
                      Question {currentQuestionIndex + 1} of{" "}
                      {quizQuestions.length}
                    </h2>
                    <p className="lead text-center mb-4">
                      {currentQuestion.question}
                    </p>

                    <div className="d-grid gap-2 mb-4">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswer === index
                              ? index === currentQuestion.correctAnswer
                                ? "success"
                                : "danger"
                              : "outline-primary"
                          }
                          onClick={() => handleAnswer(index)}
                          disabled={showFeedback}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </Button>
                      ))}
                    </div>

                    {showFeedback && (
                      <Alert
                        variant={
                          selectedAnswer === currentQuestion.correctAnswer
                            ? "success"
                            : "danger"
                        }
                      >
                        <Alert.Heading>
                          {selectedAnswer === currentQuestion.correctAnswer
                            ? "Correct!"
                            : "Incorrect!"}
                        </Alert.Heading>
                        <p>
                          {selectedAnswer === currentQuestion.correctAnswer
                            ? "Great job! You got the right answer."
                            : `Sorry, that's not correct. The right answer was: ${
                                currentQuestion.options[
                                  currentQuestion.correctAnswer
                                ]
                              }`}
                        </p>
                      </Alert>
                    )}

                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Game Progress:</span>
                        <span>
                          Score: {score}/{quizQuestions.length}
                        </span>
                      </div>
                      <ProgressBar
                        now={progress}
                        label={`${Math.round(progress)}%`}
                      />
                    </div>

                    <div className="text-center">
                      <Button
                        variant="primary"
                        onClick={handleNextQuestion}
                        disabled={!showFeedback}
                      >
                        {isLastQuestion ? "Finish Quiz" : "Next Question"}
                      </Button>
                    </div>
                  </>
                )}

                {gameState === "results" && (
                  <div className="text-center">
                    <h2 className="h3 mb-4">Quiz Completed!</h2>
                    <p className="lead mb-4">
                      Your final score: {score}/{quizQuestions.length}
                    </p>
                    <p>
                      {score === quizQuestions.length
                        ? "Perfect score! You're a true Schitt's Creek expert!"
                        : score >= quizQuestions.length * 0.8
                        ? "Great job! You really know your Schitt's Creek!"
                        : score >= quizQuestions.length * 0.6
                        ? "Not bad! You've got a good grasp of Schitt's Creek."
                        : "Looks like you might need to rewatch some episodes!"}
                    </p>
                    <Button onClick={handleRestartGame} size="lg">
                      Play Again
                    </Button>
                  </div>
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
