import requests

url = "http://127.0.0.1:5000/predict_home_price"
data = {
    'total_sqft': 1000,
    'bhk': 2,
    'bath': 2,
    'location': 'Electronic City'
}

try:
    response = requests.post(url, data=data)
    print("Status Code:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("Error:", e)
