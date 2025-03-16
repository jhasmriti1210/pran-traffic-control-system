import React, { useState, useEffect } from "react";
import "./Quiz.css";

const allQuestions = [
  {
    question: "What is the main cause of global warming?",
    options: [
      "Deforestation",
      "Plastic Waste",
      "Greenhouse gases",
      "Littering",
    ],
    answer: "Greenhouse gases",
  },
  {
    question: "Which renewable energy source is the most used worldwide?",
    options: ["Solar", "Wind", "Hydro", "Geothermal"],
    answer: "Hydro",
  },
  {
    question: "Which gas do trees absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"],
    answer: "Carbon Dioxide",
  },
  {
    question: "What is the best way to reduce plastic waste?",
    options: [
      "Burning it",
      "Recycling",
      "Throwing it in the ocean",
      "Burying it",
    ],
    answer: "Recycling",
  },
  {
    question: "Which is the cleanest source of energy?",
    options: ["Coal", "Nuclear", "Wind", "Oil"],
    answer: "Wind",
  },
  {
    question: "Which country produces the most wind energy?",
    options: ["USA", "China", "Germany", "India"],
    answer: "China",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific",
  },
  {
    question: "Which material takes the longest to decompose?",
    options: ["Paper", "Glass", "Plastic", "Aluminum"],
    answer: "Glass",
  },
  {
    question: "What is an alternative to plastic bags?",
    options: ["Paper bags", "Silk bags", "Rubber bags", "Metal bags"],
    answer: "Paper bags",
  },
  {
    question: "Which contributes the most to ocean pollution?",
    options: ["Oil spills", "Plastic waste", "Industrial chemicals", "Sewage"],
    answer: "Plastic waste",
  },
  {
    question: "Which layer of the atmosphere protects us from UV rays?",
    options: ["Troposphere", "Ozone Layer", "Stratosphere", "Mesosphere"],
    answer: "Ozone Layer",
  },
  {
    question: "What percentage of Earth's water is freshwater?",
    options: ["50%", "25%", "3%", "10%"],
    answer: "3%",
  },
];

const getRandomQuestions = () => {
  return allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setCompleted(true);
      }
    }, 1000);
  };

  const getReward = () => {
    if (score < 4) return "❌ Fail";
    if (score >= 4 && score <= 7) return "🥈 Silver Medal!";
    if (score > 7 && score <= 9) return "🥉 Bronze Medal!";
    if (score === 10) return "🏆 Gold Medal!";
  };

  return (
    <div className="quiz-container">
      <h2>Awareness Quiz 🌍</h2>
      {!completed ? (
        <div className="quiz-box">
          {questions.length > 0 && (
            <>
              <h3>{questions[currentIndex].question}</h3>
              <div className="options">
                {questions[currentIndex].options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${
                      selectedAnswer
                        ? option === questions[currentIndex].answer
                          ? "correct"
                          : option === selectedAnswer
                          ? "incorrect"
                          : ""
                        : ""
                    }`}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="result-box">
          <h3>Quiz Completed! 🎉</h3>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <p>Reward: {getReward()}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
