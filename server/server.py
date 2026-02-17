from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    try:
        total_sqft = float(request.form['total_sqft'])
        location = request.form['location']
        bhk = int(request.form['bhk'])
        bath = int(request.form['bath'])

        estimated_price = util.get_estimated_price(location,total_sqft,bhk,bath)
        
        # Calculate range
        lower_bound = round(estimated_price * 0.90, 2)
        upper_bound = round(estimated_price * 1.10, 2)
        
        # Calculate price per sqft
        price_per_sqft = round((estimated_price * 100000) / total_sqft, 2) if total_sqft > 0 else 0
        
        # Determine confidence
        confidence = "High"
        if total_sqft < 300 or total_sqft > 5000:
            confidence = "Low"
        elif total_sqft < 600 or total_sqft > 4000:
             confidence = "Medium"

        response = jsonify({
            'estimated_price': estimated_price,
            'price_range': {
                'min': lower_bound,
                'max': upper_bound
            },
            'price_per_sqft': price_per_sqft,
            'confidence': confidence,
            'metrics': util.get_model_metrics(),
            'feature_importance': util.get_feature_importance()
        })
        return response
    except Exception as e:
        print(f"Error in predict_home_price: {e}")
        with open("server_error.log", "a") as f:
            f.write(f"Error in predict_home_price: {e}\n")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    try:
        util.load_saved_artifacts()
        print("Artifacts loaded successfully")
    except Exception as e:
        print(f"Failed to load artifacts: {e}")
        with open("server_error.log", "a") as f:
            f.write(f"Failed to load artifacts: {e}\n")
    app.run(port=5001, debug=True)