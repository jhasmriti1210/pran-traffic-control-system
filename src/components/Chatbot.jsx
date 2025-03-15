import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { projectInfo } from "../projectInfo";
import Aqi from "./Aqi";
import "./Chatbot.css";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: projectInfo,
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isLocationButtonDisabled, setIsLocationButtonDisabled] =
    useState(false);
  const chatBodyRef = useRef();

  const handleLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocationButtonDisabled(true); // Disable button when clicked

    setChatHistory((prev) => [
      ...prev,
      { role: "model", text: "Fetching your exact location..." },
    ]);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();
          const exactLocation =
            geoData.address.suburb || geoData.address.city || "Unknown Area";

          const apiKey = "c0add54beec14d3faba185522250903";
          const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;

          const weatherRes = await fetch(weatherUrl);
          const weatherData = await weatherRes.json();

          const weatherText = `📍 Location: ${exactLocation}, ${weatherData.location.region} 
🌡️ Temperature: ${weatherData.current.temp_c}°C 
🌫️ Condition: ${weatherData.current.condition.text} 
💨 Humidity: ${weatherData.current.humidity}% 
🌍 AQI: ${weatherData.current.air_quality.pm2_5}`;

          setChatHistory((prev) => [
            ...prev,
            { role: "model", text: weatherText },
          ]);
        } catch (error) {
          setChatHistory((prev) => [
            ...prev,
            {
              role: "model",
              text: "Failed to retrieve location-based weather.",
            },
          ]);
          setIsLocationButtonDisabled(false); // Re-enable if request fails
        }
      },
      (error) => {
        setChatHistory((prev) => [
          ...prev,
          { role: "model", text: "Unable to retrieve your location." },
        ]);
        setIsLocationButtonDisabled(false); // Re-enable if user denies permission
      }
    );
  };

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.text === "Thinking..." ? { role: "model", text, isError } : msg
        )
      );
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error?.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div>
      <Aqi />
      <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
        <button
          onClick={() => setShowChatbot((prev) => !prev)}
          id="chatbot-toggler"
          className={showChatbot ? "chat-open" : ""}
        >
          {!showChatbot ? (
            <span className="material-symbols-rounded">mode_comment</span>
          ) : (
            <span className="material-symbols-rounded">close</span>
          )}
        </button>

        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">PranVayu</h2>
            </div>
            <button
              onClick={() => setShowChatbot((prev) => !prev)}
              className="material-symbols-rounded"
            >
              keyboard_arrow_down
            </button>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there <br />
                How can I help you today?
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <button
              onClick={handleLiveLocation}
              className="location-btn"
              disabled={isLocationButtonDisabled}
            >
              📍 Share Live Location
            </button>
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
