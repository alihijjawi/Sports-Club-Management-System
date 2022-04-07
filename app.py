from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask import jsonify
from flask_cors import CORS
from flask import render_template
from flask import url_for



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

@app.route('/coachlogin', methods = ['GET'])
def getLogin():
    return render_template("Coach_Login.html")

@app.route('/payment', methods = ['GET'])
def getPayment():
    return render_template("Payment.html")

@app.route('/save', methods=['POST'])
def save_info():
    data = request.json
    full_name = data['full_name']
    email = data['email']
    address = data['address']
    city = data['city']
    state = data['state']
    zip_code = data['zip_code']
    name_on_card = data['name_on_card']
    credit_card_number = data['credit_card_number']
    exp_month = data['exp_month']
    exp_year = data['exp_year']
    cvv = data['cvv']
    info = PaymentInfo(full_name, email, address, city, state, zip_code, name_on_card, credit_card_number, exp_month, exp_year, cvv)
    db.session.add(info)
    db.session.commit()
    message = {"error": 0, "message": "The information has been successfully saved."}
    return jsonify(message)




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

class PaymentInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(128))
    email = db.Column(db.String(128))
    address = db.Column(db.String(128))
    city = db.Column(db.String(128))
    state = db.Column(db.String(128))
    zip_code = db.Column(db.String(128))
    name_on_card = db.Column(db.String(128))
    credit_card_number = db.Column(db.String(128))
    exp_month = db.Column(db.String(128))
    exp_year = db.Column(db.String(128))
    cvv = db.Column(db.String(128))

    def __init__(self, full_name, email, address, city, state, zip_code, name_on_card, credit_card_number, exp_month, exp_year, cvv):
        self.full_name = full_name
        self.email = email
        self.address = address
        self.city = city
        self.state = state
        self.zip_code = zip_code
        self.name_on_card = name_on_card
        self.credit_card_number = credit_card_number
        self.exp_month = exp_month
        self.exp_year = exp_year
        self.cvv = cvv

