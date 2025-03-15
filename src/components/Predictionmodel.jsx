import React, { useState } from "react";
import Plot from "react-plotly.js";
import "./Predictormodel.css"; // Import CSS file

const AQIPredictor = () => {
  const [pm10, setPm10] = useState("");
  const [aqiResult, setAqiResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setError(null);
    setAqiResult(null);
    setLoading(true);

    if (!pm10) {
      setError("Please enter a PM10 value.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pm10: pm10 }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction. Check the backend.");
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setAqiResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aqi-container">
      <h2 className="aqi-title">AQI Predictor</h2>

      <input
        type="number"
        className="aqi-input"
        placeholder="Enter PM10 Level"
        value={pm10}
        onChange={(e) => setPm10(e.target.value)}
      />

      <button className="aqi-button" onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Predict AQI for next hour"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {aqiResult && (
        <div className="aqi-result">
          <p>
            PM10 Level: <strong>{aqiResult.pm10}</strong>
          </p>
          <p>
            Predicted AQI: <strong>{aqiResult.predicted_aqi}</strong>
          </p>
          <p className={`aqi-category ${aqiResult.color}`}>
            Category: {aqiResult.category}
          </p>

          {/* AQI Meter */}
          <div className="aqi-meter">
            <Plot
              data={[
                {
                  type: "indicator",
                  mode: "gauge+number",
                  value: aqiResult.predicted_aqi,
                  title: { text: "AQI Meter" },
                  gauge: {
                    axis: { range: [0, 300] },
                    steps: [
                      { range: [0, 50], color: "green" },
                      { range: [51, 100], color: "orange" },
                      { range: [101, 300], color: "red" },
                    ],
                    bar: { color: "black" },
                  },
                },
              ]}
              layout={{ width: 500, height: 350 }}
            />
          </div>

          {/* Future AQI Predictions Graph */}
          <div className="aqi-graph">
            <Plot
              data={[
                {
                  x: aqiResult.future_aqi.hours_ahead,
                  y: aqiResult.future_aqi.predictions,
                  type: "scatter",
                  mode: "lines+markers",
                  name: "Predicted AQI",
                },
              ]}
              layout={{
                title: "Predicted AQI for Next Few Hours",
                xaxis: { title: "Hours Ahead" },
                yaxis: { title: "AQI Level" },
                width: 500,
                height: 350,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AQIPredictor;
