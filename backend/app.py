from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/')
def home():
    return 'Team Hotel Trivia Go Backend'


@app.route('/mda/generate')
def generate_mda():
    # generate mda using machine learning model and return results

    return jsonify(result='#####')
