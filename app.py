from flask import Flask, jsonify, request
from generate_mda import generate_mda_main

app = Flask(__name__)


@app.route('/')
def home():
    return 'Team Hotel Trivia Go Backend'


@app.route('/mda/generate', methods=['POST'])
def generate_mda():
    # generate mda using machine learning model and return results
    if request.method == 'GET':
        return 'GET not allowed', 401

    content = request.json
    print(content)
    generate_mda_main(content["keyword"])
    return jsonify(result='#####'), 200
