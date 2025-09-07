from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
model = joblib.load('random_forest_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array([[
        data['RBS'],
        data['abortion'],
        data['HB'],
        data['numConceived'],
        data['HBA1C'],
        data['RR'],
        data['Age'],
        data['deliveries'],
        data['liveBirth'],
        data['SystolicBP'],
        data['DiastolicBP'],
        data['childDeath'],
        data['HeartRate'],
        data['BodyTemp']
    ]])
    prediction = model.predict(features)
    return jsonify({'risk': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
