import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/home.png",
      text: "Breathe Clean, Live Green: AI-Powered Pollution Control",
    },
    {
      image: "/home1.png",
      text: "PranVayu: Harnessing AI for a Pollution-Free Tomorrow",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay">
              <h2>{slide.text}</h2>
              <p>
                Stay informed about Delhi's free pollution control measures and
                government initiatives for cleaner air.
              </p>
              <a href="#about" className="explore-btn">
                Know More
              </a>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="nav-arrow left">
          ❮
        </button>
        <button onClick={nextSlide} className="nav-arrow right">
          ❯
        </button>
      </div>
      {/*about section*/}

      <section id="about" className="about-section">
        <div className="about-image">
          <img src="/logo.png" alt="Profile" />
        </div>
        <div className="about-content">
          <h2>PranVayu</h2>
          <h4>AI-Driven Pollution Prediction and Adaptive Control System</h4>
          <p>
            <strong>PranVayu</strong> an AI-powered solution designed to combat
            the severe air pollution crisis in Delhi NCR by leveraging deep
            learning, reinforcement learning, and real-time decision-making. It
            predicts air quality levels, optimizes traffic flow to reduce
            vehicular emissions, enhances energy efficiency, and integrates
            IoT-based sensor networks for real-time monitoring. By analyzing
            vast environmental datasets, PranVayu provides actionable insights
            for policymakers, enabling data-driven strategies for pollution
            control. Its scalable and research-grade framework ensures high
            accuracy, making it a practical, innovative, and impactful solution
            for building a cleaner, healthier future.
          </p>
          <p>
            With its cutting-edge AI models and adaptive learning mechanisms,
            PranVayu continuously evolves to address dynamic environmental
            challenges. By fostering collaboration between researchers,
            policymakers, and urban planners, it paves the way for sustainable
            urban development and a greener tomorrow.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="features-heading">Our Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <img src="/aiimage.png" alt="AI Analysis" />
            <h3>AI-Powered Pollution Prediction</h3>
            <p>
              PranVayu utilizes advanced Deep Learning (LSTM + Transformer)
              models to predict air pollution levels with high accuracy. By
              analyzing satellite imagery, historical pollution data, and
              real-time weather conditions, it provides early warnings and
              hotspot identification.
            </p>
          </div>
          <div className="feature-card">
            <img src="/traffic.png" alt="Traffic Optimization" />
            <h3> Smart Traffic Flow Optimization</h3>
            <p>
              PranVayu utilizes AI to analyze real-time AQI levels, traffic
              conditions, and distance to determine the best route for
              commuters. By prioritizing cleaner air quality, minimizing
              congestion, and optimizing travel time, it ensures a healthier and
              more efficient urban mobility experience without directly
              controlling traffic signals.
            </p>
          </div>
          <div className="feature-card">
            <img className="chatb" src="/chatbot.png" alt="Chatbot" />
            <h3>Interactive Chatbot for Awareness</h3>
            <p>
              PranVayu's AI chatbot provides real-time insights on air quality,
              health tips, and government initiatives, helping users stay
              informed and make eco-friendly choices. It simplifies pollution
              awareness by offering easy-to-understand information based on
              reliable data sources.
            </p>
          </div>
        </div>
      </section>
      {/*last end section*/}
      <div className="hero-container">
        <div className="overlay"></div> {/* Dark overlay */}
        <div className="content">
          <h1>AI-Powered Pollution Control for a Healthier Future</h1>
          <p>
            <strong>PranVayu</strong> leverages cutting-edge AI to predict
            pollution levels and implement adaptive control measures in real
            time. Join us in creating a cleaner and healthier environment for
            everyone. After Login you can use Pranvayu Assistant, AQI Predictor
            to predict next hour AQI, Traffic Optimizer for finding best route
            and Play Interesting Games.
          </p>
          <a href="/" className="cta-button">
            Get Started
          </a>
        </div>
      </div>
      {/*end section*/}
      <footer className="footer">
        <div className="footer-container">
          {/* Logo and About Section */}
          <div className="footer-about">
            <img
              src="/logo.png"
              alt="Shield For She Logo"
              className="footer-logo"
            />
            <p>
              <strong>PranVayu</strong>, we're dedicated to making a secure
              website for women's safety and we give our best at what we do.
            </p>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h3>CONTACT</h3>
            <p>pranvayu@gmail.com</p>
            <p>Delhi Skill and Entrepreneurship University</p>
          </div>

          {/* Social Media Section */}
          <div className="footer-social">
            <h3>SOCIAL MEDIA</h3>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            {/* Add social media icons/links here */}
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="footer-bottom">
          <p>
            © 2025 <span className="highlight">PranVayu</span> ™. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
