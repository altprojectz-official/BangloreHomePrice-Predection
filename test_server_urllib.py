import urllib.request
import urllib.parse
import urllib.error
import json

url = "http://127.0.0.1:5001/predict_home_price"
data = {
    'total_sqft': '1000',
    'bhk': '2',
    'bath': '2',
    'location': 'Electronic City'
}

data = urllib.parse.urlencode(data).encode()
req = urllib.request.Request(url, data=data)

try:
    resp = urllib.request.urlopen(req)
    print("Status Code:", resp.getcode())
    print("Response:", resp.read().decode())
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code)
    try:
        print("Error Body:", e.read().decode())
    except:
        print("Could not read error body")
except Exception as e:
    print("Error:", e)
