import React, { useState, useEffect } from "react";
import "./Gamified.css";
import { Link } from "react-router-dom";

const EcoFeatures = () => {
  const [coins, setCoins] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathMessage, setBreathMessage] = useState(
    "Click to Start Breathing"
  );
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(0);
  const [pledge, setPledge] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [pledges, setPledges] = useState([
    { text: "I will use public transport more!", coins: 5 },
    { text: "I will reduce plastic use!", coins: 5 },
  ]);
  const [years, setYears] = useState(10);
  const [prediction, setPrediction] = useState("");
  const [challenge, setChallenge] = useState("");

  const challenges = [
    "Walk instead of driving for a day 🚶‍♂️",
    "Reduce plastic use 🛍️",
    "Plant a tree 🌱",
    "Save electricity for 1 hour 💡",
    "Pick up 5 pieces of trash 🗑️",
    "Reduce water waste 🚰",
  ];

  useEffect(() => {
    setChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
  }, []);

  // Updated startBreathing function to reward 5 points instead of 10
  const startBreathing = () => {
    setIsBreathing(true);
    setTimer(0);
    setBreathMessage("Breathe In...");

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setTimer(count);

      if (count === 3) {
        setBreathMessage("Hold...");
      }
      if (count === 8) {
        setBreathMessage("Breathe Out...");
      }
      if (count === 13) {
        clearInterval(interval);
        setIsBreathing(false);
        setBreathMessage("Click to Start Again!");

        setCoins((prev) => prev + 5); // Reward 5 points for breathing
        setTotalScore((prev) => prev + 5); // Update total score
        setProgress((prev) => Math.min(prev + 5, 100));
      }
    }, 1000);
  };

  // Submit pledge function that adds points and updates total score
  const submitPledge = () => {
    if (pledge.trim()) {
      setPledges([...pledges, { text: pledge, coins: 5 }]);
      setPledge("");
      setCoins((prev) => prev + 5);
      setProgress((prev) => Math.min(prev + 5, 100));
      setTotalScore((prev) => prev + 5); // Update total score
    }
  };

  // Pollution Exposure Calculator
  const calculatePollution = () => {
    const pollutionLevel =
      years > 20 ? "😷 High pollution risk!" : "🙂 Eco-friendly lifestyle!";
    setPrediction(
      `In ${years} years, your pollution exposure: ${pollutionLevel}`
    );
  };

  return (
    <div className="eco-container">
      <div className="robot-container">
        <img src="/chatbot.png" alt="Eco Bot" className="robot-avatar" />
        <h1>
          Rack Up <span>Green Points!</span>
        </h1>
      </div>

      <section className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
        <p>Level Progress: {progress}%</p>
        <h3>Total Score: {totalScore} 🏆</h3>
      </section>

      <section className="breathing-section">
        <h2>🫁 Breathing Exercise</h2>
        <div
          className={`breathing-circle ${isBreathing ? "animate" : ""}`}
          onClick={startBreathing}
        >
          {breathMessage} <br />
          {isBreathing && <span>{timer}s</span>}
        </div>
      </section>

      <section className="pledge-section">
        <h2>🌱 Eco-Friendly Pledge Wall</h2>
        <input
          type="text"
          placeholder="Enter your pledge..."
          value={pledge}
          onChange={(e) => setPledge(e.target.value)}
        />
        <button onClick={submitPledge}>Submit</button>
        <div className="pledge-list">
          {pledges.map((p, index) => (
            <p key={index} className="pledge-item">
              ✔️ {p.text} (+{p.coins} 🏆)
            </p>
          ))}
        </div>
      </section>

      <section className="pollution-calculator">
        <h2>🌍 Pollution Exposure Calculator</h2>
        <input
          type="range"
          min="5"
          max="50"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
        <button onClick={calculatePollution}>Calculate</button>
        {prediction && <p className="prediction">{prediction}</p>}
      </section>

      <section className="eco-challenge">
        <h2>💪 Weekly Eco Challenge</h2>
        <p>{challenge}</p>
        <button onClick={() => setCoins((prev) => prev + 20)}>
          Complete Challenge ✅ (+20 🏆)
        </button>
      </section>

      <section className="quiz-section">
        <Link to="/quiz" className="quiz-button">
          Take Quiz 🎯
        </Link>
      </section>
    </div>
  );
};

export default EcoFeatures;
