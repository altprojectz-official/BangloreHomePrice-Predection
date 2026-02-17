# Bangalore Home Price Prediction

A comprehensive machine learning web application that predicts real estate prices in Bangalore. This project demonstrates the integration of a Machine Learning model (built with Scikit-learn) into a user-friendly web interface using a Python Flask backend and a vanilla HTML/CSS/JS frontend.

## 🚀 Features

- **Smart Price Prediction**: elaborate predictions based on location, square footage, BHK (bedrooms), and bathrooms.
- **Price Range Estimation**: Provides a likely price range (±10%) alongside the specific estimated value.
- **Price Per Square Foot**: Automatically calculated for better value assessment.
- **Confidence Indicator**: Displays a confidence level (High, Medium, Low) based on input validation logic (e.g., checking for realistic square footage).
- **Interactive UI**: Clean and responsive detailed user interface for easy data entry.

## 🛠 Technology Stack

- **Machine Learning**: 
  - `scikit-learn` for the regression model
  - `pandas` and `numpy` for data manipulation
- **Backend API**: 
  - `Python 3`
  - `Flask` micro-framework
- **Frontend**: 
  - `HTML5`, `CSS3`
  - `JavaScript` (Vanilla) with `jQuery` for API calls

## 📂 Project Structure

```bash
BangloreHomePrices/
├── client/                 # Frontend Application
│   ├── app.html            # Main UI file
│   ├── app.css             # Styling logic
│   └── app.js              # Frontend logic and API integration
├── server/                 # Backend Application
│   ├── server.py           # Main Flask application entry point
│   ├── util.py             # Utility functions for model/artifact loading
│   ├── minimal_server.py   # Alternative minimal server implementation
│   ├── requirements.txt    # Python dependencies
│   └── artifacts/          # ML Model files (not committed to repo usually)
├── model/                  # Data Science Work content
│   ├── banglore_home_prices_model.pickle  # Serialized Model
│   ├── columns.json                       # Feature Column names
│   └── ... (notebooks and datasets)
├── run.bat                 # Helper script to run the application
└── README_LOCAL.md         # Local setup instructions
```

## ⚙️ Setup & Installation

Follow these steps to run the application locally on your machine.

### Prerequisites
- Python 3.x installed
- pip (Python package manager)

### 1. Backend Setup

Navigate to the server directory and install the required dependencies:

```bash
cd server
pip install -r requirements.txt
```

Launch the Flask server:

```bash
python server.py
```
*The server will start on `http://127.0.0.1:5001` (or 5000, check console output).*

### 2. Frontend Setup

Simply open the `client/app.html` file in your preferred web browser.

Alternatively, you can serve it using a lightweight HTTP server (e.g., VS Code Live Server or Python http.server), but opening the file directly usually works for this setup.

## 📡 API Reference

### 1. Get Location Names
Retrieves the list of all Bangalore locations available in the model.

- **URL**: `/get_location_names`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "locations": ["1st Block Jayanagar", "1st Phase JP Nagar", ...]
  }
  ```

### 2. Predict Home Price
Predicts the price based on input features.

- **URL**: `/predict_home_price`
- **Method**: `POST`
- **Form Data**:
  - `total_sqft`: Float (e.g., 1000)
  - `location`: String (e.g., "1st Phase JP Nagar")
  - `bhk`: Integer (e.g., 2)
  - `bath`: Integer (e.g., 2)
- **Response**:
  ```json
  {
      "estimated_price": 85.0,
      "price_range": { "min": 76.5, "max": 93.5 },
      "price_per_sqft": 8500.0,
      "confidence": "High",
      "metrics": { ... },
      "feature_importance": { ... }
  }
  ```

## 📝 Usage

1. Select a **Location** from the dropdown menu.
2. Enter the **Total Square Feet** area (e.g., 1200).
3. Select the number of **BHK** (Bedrooms).
4. Select the number of **Bathrooms**.
5. Click **"Estimate Price"**.
6. View the predicted price, price range, and other details.

---
*Created for the Bangalore Home Price Prediction Project.*
