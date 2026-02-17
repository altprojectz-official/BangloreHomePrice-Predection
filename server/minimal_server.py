from flask import Flask, request, jsonify
# from flask_cors import CORS
CORS = lambda x: x # Mock CORS

app = Flask(__name__)
# CORS(app)

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    try:
        # total_sqft = float(request.form['total_sqft']) # commented out
        # ...
        print("Request received")
        return jsonify({'estimated_price': 100.0})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    print("Starting Minimal Server...")
    app.run(port=5001, debug=True)
