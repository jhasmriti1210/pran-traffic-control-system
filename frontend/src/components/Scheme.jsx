import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import districtData from "./Ngodata"; // Correct import
import "./Scheme.css";

export default function Scheme() {
  const { district } = useParams();
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const formattedDistrict = district.toLowerCase();
    setSchemes(districtData[formattedDistrict] || []);
  }, [district]);

  return (
    <div className="app">
      <h2 className="district-title">
        {district
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
      </h2>
      <div className="card-container">
        {schemes.length > 0 ? (
          schemes.map((scheme, index) => (
            <div key={index} className="card">
              <h3>{scheme.name}</h3>
              <p>
                <strong>Type:</strong> {scheme.type}
              </p>
              <p>{scheme.description}</p>
              <div className="link-container">
                <a
                  href={scheme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
                <br />
                <a
                  href={scheme.location}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No schemes available for this district.</p>
        )}
      </div>
    </div>
  );
}
