import React, { useEffect, useMemo, useState } from "react";
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
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://synlabs-server.onrender.com/ques"
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
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

  const shuffledAnswers = useMemo(() => {
    return questions && questions.length
      ? [
          questions[currentQuestion].correct_answer,
          ...questions[currentQuestion].incorrect_answers,
        ].sort(() => Math.random() - 0.5)
      : [];
  }, [questions, currentQuestion]);

  if (currentQuestion === questions.length - 1) {
    return (
      <div>
        <h1>Quiz</h1>
        <p>Thank you for completing the quiz!</p>
        <button onClick={() => setCurrentQuestion(0)}>Start Again</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {loading ? (
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
              {/* {currentQuestion + 1}/{questions.length} */}
            </div>
            {/* <div className="score">{calculatePercentage()}%</div> */}
          </div>
          {showResult ? (
            <div className="result">
              {selectedAnswer === questions[currentQuestion].correct_answer ? (
                <p>Correct!</p>
              ) : (
                <p>Sorry, Please try again.</p>
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
                {shuffledAnswers.map((answer, index) => (
                  <button key={index} onClick={() => handleAnswerClick(answer)}>
                    {decodeURIComponent(answer)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
