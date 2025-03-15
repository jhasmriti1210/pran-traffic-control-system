from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
import datetime
import osmnx as ox
import networkx as nx
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5176"}})

# Load trained AQI model
model_filename = "rf_aqi_model.pkl"
try:
    rf_model = joblib.load(model_filename)
    print("✅ Model loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    rf_model = None

# Load dataset for feature reference
try:
    sample_data = pd.read_csv("delhi_aqi.csv")
    sample_data['date'] = pd.to_datetime(sample_data['date'])
    
    # Feature Engineering
    sample_data['hour'] = sample_data['date'].dt.hour
    sample_data['day'] = sample_data['date'].dt.day
    sample_data['month'] = sample_data['date'].dt.month
    sample_data['season'] = sample_data['month'] % 12 // 3 + 1
    
    # Creating Lag & Rolling Mean Features
    for col in ['co', 'no', 'no2', 'o3', 'so2', 'pm2_5', 'pm10', 'nh3']:
        sample_data[f'{col}_lag1'] = sample_data[col].shift(1)
    for col in ['pm2_5', 'pm10']:
        sample_data[f'{col}_rolling24'] = sample_data[col].rolling(window=24, min_periods=1).mean()
    sample_data.dropna(inplace=True)
    
    # Get feature names
    FEATURES = [col for col in sample_data.columns if col not in ['date', 'pm2_5']]
except Exception as e:
    print(f"❌ Error loading dataset: {e}")
    sample_data = None
    FEATURES = []

# AQI Classification Function
def classify_aqi(value):
    if value <= 50:
        return "Good", "green"
    elif value <= 100:
        return "Moderate", "orange"
    else:
        return "Bad", "red"

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "AQI Prediction API is running. Use /predict endpoint."})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        pm10 = data.get('pm10')
        if pm10 is None:
            return jsonify({'error': 'PM10 value is required'}), 400
        pm10 = float(pm10)
        
        if rf_model is None:
            return jsonify({'error': 'Model not loaded. Please check backend logs.'}), 500
        
        current_time = datetime.datetime.now()
        input_df = pd.DataFrame(columns=FEATURES)
        input_df.loc[0] = sample_data[FEATURES].mean()
        input_df['pm10'] = pm10
        input_df['hour'] = current_time.hour
        input_df['day'] = current_time.day
        input_df['month'] = current_time.month
        input_df['season'] = (current_time.month % 12) // 3 + 1
        
        predicted_aqi = rf_model.predict(input_df)[0]
        aqi_category, color = classify_aqi(predicted_aqi)
        
        future_hours = list(range(1, 6))
        future_aqi = [predicted_aqi + np.random.uniform(-10, 10) for _ in future_hours]
        
        return jsonify({
            'pm10': pm10,
            'predicted_aqi': round(predicted_aqi, 2),
            'category': aqi_category,
            'color': color,
            'future_aqi': {'hours_ahead': future_hours, 'predictions': future_aqi}
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Best Route Calculation with AQI Consideration
@app.route("/best-route", methods=["POST"])
def best_route():
    try:
        data = request.get_json()
        source = tuple(data.get('source'))  # (lat, lon)
        destination = tuple(data.get('destination'))  # (lat, lon)

        if not source or not destination:
            return jsonify({'error': 'Source and Destination are required'}), 400
        
        # Get road network within 10km of the source
        G = ox.graph_from_point(source, dist=10000, network_type='drive')
        
        # Convert lat/lon to nearest graph nodes
        orig_node = ox.distance.nearest_nodes(G, source[1], source[0])
        dest_node = ox.distance.nearest_nodes(G, destination[1], destination[0])
        
        # Function to fetch AQI for a location (simulating real-time AQI)
        def get_aqi(lat, lon):
            return np.random.uniform(50, 150)  # Replace with real AQI data source if available
        
        # A* search with AQI and distance weights
        def aqi_weight(u, v, d):
            road_distance = d.get('length', 1)  # Default to 1m if no length provided
            lat, lon = G.nodes[v]['y'], G.nodes[v]['x']
            aqi_value = get_aqi(lat, lon)
            return road_distance * (1 + aqi_value / 100)  # Weighted cost

        # Find shortest path with AQI-weighted distance
        try:
            route = nx.shortest_path(G, orig_node, dest_node, weight=aqi_weight)
            route_coords = [(G.nodes[node]['y'], G.nodes[node]['x']) for node in route]
            return jsonify({
                'route': route_coords,
                'message': 'Best route calculated based on AQI and road distance.'
            })
        except nx.NetworkXNoPath:
            return jsonify({'error': 'No valid route found. Try a different location.'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)