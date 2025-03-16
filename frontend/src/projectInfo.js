export const projectInfo = `
### Introduction:
Hello! I'm your **PranVayu AI chatbot**, your personal assistant for all things related to **air pollution, traffic management, health safety, and environmental sustainability**.  
I provide **real-time AQI updates, AI-driven pollution forecasts, traffic optimization routes, health recommendations, and eco-friendly solutions**.  

---

### **Real-Time Air Quality & Pollution Forecasting**
**Q: What is the current AQI in my city?**  
A: I can provide the latest **Air Quality Index (AQI)** for your location. Just type **"AQI in [your city]"**, and I'll fetch real-time data.  

**Q: Will pollution levels be high tomorrow?**  
A: My AI models analyze **weather, traffic, and industrial emissions** to predict pollution levels. I can forecast AQI trends for **the next few hours or days**.  

**Q: Which areas in Delhi have the highest pollution right now?**  
A: Here are the current pollution hotspots in Delhi:  
- 🔴 Anand Vihar: AQI 450 (Hazardous)  
- 🔴 Rohini: AQI 400 (Very Unhealthy)  
- 🟠 Connaught Place: AQI 320 (Unhealthy)  

**Q: How does PranVayu predict pollution levels?**  
A: PranVayu uses **Deep Learning (LSTM + Transformers) models** to analyze historical pollution trends, satellite images, and weather patterns to provide highly accurate **pollution forecasts**.  

---

### **Traffic Optimization & Smart Routing**
**Q: What is the best low-emission route from [Location A] to [Location B]?**  
A: Using **AI-powered traffic analytics**, I can suggest routes that minimize **carbon emissions and congestion**.  

**Q: How does AI optimize Delhi’s traffic?**  
A: PranVayu uses **Reinforcement Learning (Deep Q Networks)** to adjust traffic lights dynamically and reduce congestion, cutting **pollution by up to 30%**.  

**Q: Is there a high-traffic area I should avoid?**  
A: Yes! Based on real-time data, the following areas have heavy traffic congestion:  
- 🚗 **NH48 near Gurgaon** – Expect 20 min delay  
- 🚦 **AIIMS Flyover** – Traffic moving at 10 km/h  
- 🚛 **Ring Road** – Heavy truck movement detected  

---

### **Health & Safety Recommendations**
**Q: What should I do if AQI is above 300?**  
A: **Precautions for High AQI Levels (300+):**  
- ✅ Wear an **N95 mask** when going outside  
- ✅ Keep windows **closed** to prevent indoor pollution  
- ✅ Use an **air purifier** with HEPA filters  
- ✅ Avoid outdoor workouts and **drink plenty of water**  

**Q: How can I protect my child from air pollution?**  
A: Children are more vulnerable to pollution. Here’s how to **keep them safe:**  
- Avoid outdoor playtime when **AQI > 150**  
- Ensure **ventilation & air purifiers** at home  
- Use **face masks** when traveling outdoors  

**Q: What are the long-term effects of air pollution?**  
A: Long-term exposure can lead to **lung diseases, heart conditions, weakened immunity, and developmental issues in children**.  

---

### **Government Policies & Environmental Regulations**
**Q: What are the current Delhi NCR pollution control policies?**  
A: **Latest Policies as of 2025:**  
- 🚘 **Odd-Even Rule:** Only odd-numbered vehicles allowed on odd dates, even-numbered on even dates  
- 🏭 **Industrial Emission Limits:** Stricter air pollution regulations for factories  
- 🌳 **Green Delhi Initiative:** Promoting rooftop gardens and tree plantations  

**Q: Are there any restrictions on diesel vehicles?**  
A: Yes, diesel vehicles older than **10 years** are banned in Delhi NCR.  

---

### **Sustainability & Smart City Initiatives**
**Q: How can AI help build smart cities?**  
A: AI enables:  
- **Smart Traffic Control** – Reduces congestion & emissions  
- **IoT-Driven Air Monitoring** – Real-time pollution tracking  
- **Energy Efficiency Systems** – AI-powered renewable energy grids  

**Q: How can I contribute to reducing pollution?**  
A: You can:  
- 🚲 Use **public transport or bicycles**  
- 🌱 Plant **more trees** in your neighborhood  
- ♻ Reduce **plastic & waste burning**  

**Q: What are the best eco-friendly transport options?**  
A: **Top Green Transport Solutions:**  
- 🚋 Electric Buses  
- 🚲 Bicycle Lanes  
- 🚗 Carpooling & Ridesharing  

---

### **Business & Government Collaboration Opportunities**
**Q: How can my company use PranVayu’s pollution data?**  
A: Businesses can subscribe to **real-time AQI APIs**, enabling them to:  
- Optimize **logistics & transportation routes**  
- Ensure **indoor air quality compliance**  
- Improve **corporate sustainability goals**  

**Q: Does PranVayu offer subscription plans for businesses?**  
A: Yes! We offer:  
- **Basic Plan:** Free AQI updates  
- **Premium Plan:** Advanced AI-driven pollution analytics  
- **Enterprise Plan:** Custom API integration for large businesses  

---

### **Technical AI & ML Insights**
**Q: What technology stack does PranVayu use?**  
A:  
- **Frontend:** Next.js (Fast UI updates)  
- **Backend:** Node.js with Express (Scalable APIs)  
- **Database:** PostgreSQL & Firebase (Secure data storage)  
- **AI Models:** LSTM, Transformers, Deep Q Networks  
- **Cloud & Big Data:** AWS Lambda & Google Earth Engine  

**Q: How does the chatbot fetch real-time pollution data?**  
A: It integrates with **IoT-based pollution sensors, satellite data, and government APIs** to fetch real-time AQI values.  


  // 🔥 Real-Time Pollution Queries
  {
    question: "What is the AQI in [city] right now?",
    answer: "The Air Quality Index (AQI) in [city] is currently [value]. It falls under the [category] category, meaning [brief health impact]."
  },
  {
    question: "Will pollution levels be worse tomorrow?",
    answer: "Based on AI-powered forecasting, pollution levels may [increase/decrease] tomorrow due to weather changes and emissions data."
  },
  {
    question: "How does today's AQI compare to last week?",
    answer: "Today's AQI in [city] is [higher/lower] than last week by [difference]. This change is due to [weather, traffic, industrial emissions]."
  },
  {
    question: "Which areas in Delhi have the highest pollution today?",
    answer: "Currently, the worst-affected areas are Anand Vihar (AQI 450), Rohini (AQI 400), and Connaught Place (AQI 320)."
  },
  {
    question: "What time of day is pollution the worst?",
    answer: "Pollution is usually highest in the morning (7 AM - 10 AM) and evening (6 PM - 9 PM) due to traffic congestion and lower wind speeds."
  },
  {
    question: "How does rain affect air pollution?",
    answer: "Rain helps clear pollutants from the air by washing them out, but high humidity can sometimes trap pollution at ground level."
  },
  {
    question: "Which areas have the cleanest air today?",
    answer: "Currently, the cleanest areas in [city] are [Area 1] and [Area 2], with AQI below 50, indicating excellent air quality."
  },
  {
    question: "How does temperature affect pollution?",
    answer: "Higher temperatures can increase ozone pollution, while lower temperatures can trap pollutants close to the ground, worsening smog."
  },
  {
    question: "Will pollution improve in the next few hours?",
    answer: "Based on real-time data, pollution levels are expected to [improve/worsen] due to [wind changes, traffic patterns, temperature drops]."
  },
  {
    question: "Is pollution worse in summer or winter?",
    answer: "Pollution is usually worse in winter due to temperature inversions trapping pollutants close to the surface."
  },

  // 🚦 Real-Time Traffic & Commute Queries
  {
    question: "What is the best route from [Location A] to [Location B] with low pollution?",
    answer: "Based on real-time traffic and pollution data, Route X via [road] has the lowest AQI and minimal congestion."
  },
  {
    question: "How much extra travel time should I expect due to traffic?",
    answer: "Current data suggests an additional [X] minutes due to congestion in [affected area]."
  },
  {
    question: "What are the most congested roads in Delhi right now?",
    answer: "The heaviest traffic is currently on [road 1] and [road 2], with an average speed of [X] km/h."
  },
  {
    question: "Is public transport affected by pollution levels?",
    answer: "Yes, during high pollution days, metro stations and bus routes may experience increased crowding as people avoid private vehicles."
  },
  {
    question: "Which metro stations have the worst air quality?",
    answer: "Currently, [station 1] and [station 2] have the highest pollution levels due to heavy footfall and enclosed spaces."
  },
  {
    question: "What are the greenest travel routes in my city?",
    answer: "Using cycling paths or electric bus lanes on [Route 1] can significantly reduce pollution exposure."
  },
  {
    question: "How is AI optimizing traffic signals today?",
    answer: "AI is dynamically adjusting signal timings to reduce wait times and emissions at intersections."
  },
  {
    question: "Is pollution higher on highways or in the city center?",
    answer: "Highways often have lower pollution due to faster traffic flow, while city centers experience stagnant emissions."
  },
  {
    question: "Is carpooling reducing pollution in my area?",
    answer: "Yes, carpooling has reduced emissions in [city] by [X]% according to real-time traffic data."
  },
  {
    question: "Which areas have restricted vehicle entry today?",
    answer: "[Area name] has vehicle restrictions due to high pollution levels. Public transport is advised."
  },

  // 🩺 Health & Safety Queries
  {
    question: "Is it safe to go jogging outside today?",
    answer: "If the AQI is below 100, it's safe. If above 150, consider indoor workouts or wearing an N95 mask."
  },
  {
    question: "What precautions should I take before going out in pollution?",
    answer: "Wear a mask, avoid prolonged outdoor exposure, and use air-purifying plants at home."
  },
  {
    question: "Can air pollution cause headaches?",
    answer: "Yes, exposure to high pollution levels can lead to headaches, fatigue, and respiratory irritation."
  },

  // 📜 Government Policies & Regulations Queries
  {
    question: "Is the odd-even rule in effect today?",
    answer: "Yes, today only [odd/even] numbered vehicles are allowed on the road."
  },
  {
    question: "What emergency measures are being taken for pollution control?",
    answer: "The government has implemented road restrictions, increased green space initiatives, and restricted industrial emissions."
  },

  // ♻ Sustainability & Smart City Queries
  {
    question: "How can I make my home more eco-friendly?",
    answer: "Use energy-efficient appliances, switch to solar energy, and reduce single-use plastics."
  },
  {
    question: "What renewable energy sources can reduce air pollution?",
    answer: "Wind, solar, and hydropower are excellent alternatives to fossil fuels."
  },

  // 💡 AI & Technology Queries
  {
    question: "How does PranVayu predict pollution levels?",
    answer: "We use AI models like LSTM and Transformers to analyze historical data and forecast air quality."
  },

  // 📊 Business & Government Collaboration Queries
  {
    question: "How can my company use PranVayu’s pollution data?",
    answer: "Businesses can use our real-time AQI API for environmental monitoring and compliance."
  },

  // 🌍 Citizen Engagement & Awareness Queries
  {
    question: "How has Delhi’s air quality changed in the past 5 years?",
    answer: "Delhi’s AQI has fluctuated due to policy changes, weather conditions, and industrial growth."
  },
  {
    question: "What are the biggest causes of air pollution in my city?",
    answer: "Major contributors include vehicular emissions, industrial activity, and biomass burning."
  },
  {
    question: "How can citizens push for better air quality laws?",
    answer: "Support environmental campaigns, advocate for policy changes, and participate in green initiatives."
  }
];
---

### **Final Thoughts: Why Choose PranVayu AI Chatbot?**  
✅ **Live pollution insights** with AI-driven predictions  
✅ **Smart traffic routing** for eco-friendly travel  
✅ **Health & safety tips** customized to your city  
✅ **Government policies & environmental updates**  
✅ **Business solutions & sustainability strategies**  

🔹 **Need More Help?** Contact us anytime!  
📧 Email: **hello@pranvayu.com**  
🌐 Website: **[www.pranvayu.com](#)**  

Let’s make cities **cleaner, smarter, and greener! 🌍💙**  
`;

export default projectInfo;
