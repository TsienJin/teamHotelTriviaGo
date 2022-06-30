from flask import Flask, jsonify, request
from flask_cors import CORS

from generate_mda import generate_mda_main
from database.test import connect_db, connect_collection, insert_item
from tasks import make_celery

app = Flask(__name__)
app.config.update(CELERY_BROKER_URL='redis://localhost:6379',
                  CELERY_RESULT_BACKEND='redis://localhost:6379')
CORS(app)
celery = make_celery(app)


@celery.task()
def cal_results(user_keyword, user_file):
    res = generate_mda_main(user_keyword, user_file)
    print(res)


@app.route('/')
def home():
    # db = connect_db()
    # mdna_collection = connect_collection(db)
    # insert_item(mdna_collection, {"message": 'hello'})
    return 'Team Hotel Trivia Go Backend'


@app.route('/mda/generate', methods=['POST'])
def generate_mda():
    # generate mda using machine learning model and return results
    if request.method == 'GET':
        return 'GET not allowed', 401
    if request.method == 'POST':
        if ('files' not in request.files):
            return jsonify({"message": 'No files'}), 400

        user_file = request.files['files']
        session_token = request.form.get("sessionToken")
        user_password = request.form.get("usrPassword")
        user_keyword = request.form.get("usrKeyword")
        time = request.form.get("time")

        print('user_file:', user_file)
        print('session token:', session_token)
        print('user_password:', user_password)
        print('user_keyword:', user_keyword)
        print('time:', time)

        res = cal_results(user_keyword, user_file)

        return jsonify({
            "message": 'files received',
            "sessionToken": session_token,
            "user_password": user_password,
            "time": time
        }), 200
