from flask import Flask, jsonify, request
from flask_cors import CORS

from generate_mda import generate_mda_main

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return 'Team Hotel Trivia Go Backend'


@app.route('/mda/generate', methods=['POST'])
def generate_mda():
    # generate mda using machine learning model and return results
    if request.method == 'GET':
        return 'GET not allowed', 401

    print(request.files)
    print(request.form)
    # if ('files' not in request.files):
    #     return 'No files', 400

    # user_file = request.files['files']
    # session_token = request.form.get("sessionToken")
    # user_password = request.form.get("usrPassword")

    # generate_mda_main('NTU', user_file)
    return jsonify({"message": 'files received'}), 200
