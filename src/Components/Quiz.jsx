import React, { useEffect, useState } from "react";
import "./Quiz.css";
import axios from "axios";
import { Stars } from "./Stars";
import Loader from "./Loader";


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://synlabs-server.onrender.com/ques"
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    console.log(questions);
  }, []);

  const handleAnswerClick = (answer) => {
    if (!showResult) {
      setSelectedAnswer(answer);

      if (answer === questions[currentQuestion].correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }

      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer("");
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const calculatePercentage = () => {
    return (score / questions.length) * 100;
  };

  return (
    <div className="quiz-container">
      {loading ? (
        // <p>Loading...</p>
        <Loader />
      ) : (
        <div>
          <div className="top-bar">
            <div
              className="progress-bar"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
            <div className="question-number">
              {currentQuestion + 1}/{questions.length}
            </div>
            <div className="score">{calculatePercentage()}%</div>
          </div>
          {showResult ? (
            <div className="result">
              {selectedAnswer === questions[currentQuestion].correct_answer ? (
                <p>Correct!</p>
              ) : (
                <p>Sorry. Please try again.</p>
              )}
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          ) : (
            <div className="question-container">
              <h1>
                Question {currentQuestion + 1} of {questions.length}
              </h1>
              <div className="question">
                {decodeURIComponent(questions[currentQuestion].question)}
              </div>
              <div>
                {questions[currentQuestion].difficulty === "hard" && (
                  <Stars difficulty="hard" />
                )}
                {questions[currentQuestion].difficulty === "medium" && (
                  <Stars difficulty="medium" />
                )}
              </div>

              <div className="choices">
                {questions[currentQuestion].incorrect_answers.map((answer) => (
                  <button
                    key={answer}
                    onClick={() => handleAnswerClick(answer)}
                  >
                    {decodeURIComponent(answer)}
                  </button>
                ))}
                <button
                  className="correct-choice"
                  onClick={() =>
                    handleAnswerClick(questions[currentQuestion].correct_answer)
                  }
                >
                  {decodeURIComponent(
                    questions[currentQuestion].correct_answer
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
