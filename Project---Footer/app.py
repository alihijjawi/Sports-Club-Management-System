from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask import jsonify
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Fuckapple123123@127.0.0.1:3306/430'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

@app.route('/login', methods=['POST'])
def auth_user():
    data = request.json
    user_name = data['user_name']
    password = data['password']
    dummy = "d"
    found = User.query.filter_by(user_name = user_name).first()
    if found is None:
        return jsonify({"error": 1, "message" : "Invalid credentials"})
    if not (found.password == password):
        return jsonify({"error": 2, "message": "Invalid credentials"})
    print("success")
    return jsonify({"error": 0, "message": "Welcome back " + found.first_name+"!"})




class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    user_name = db.Column(db.String(128), unique=True)
    email = db.Column(db.String(128), unique=True)
    password = db.Column(db.String(128))
    date_of_birth = db.Column(db.String(128))

    def __init__(self, first_name, last_name, user_name, email, date_of_birth, password):
        self.user_name = user_name
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = date_of_birth
        self.email = email
        self.password = password
