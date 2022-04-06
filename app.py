from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask import jsonify
from flask_cors import CORS
from flask import session, url_for, redirect, render_template
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:mira@127.0.0.1:3306/users'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['DEBUG'] = True

@app.route('/')
def index():
    if 'username' in session:
        return f'Logged in as {session["username"]}'
    return 'You are not logged in'

@app.route('/contact',  methods=['GET', 'POST'])
def contact_info():
    data = request.json
    name = data['name']
    email = data['email']
    message = data['message']
    contact = Contact(name, email, message)
    found = Contact.query.filter_by(name = name, email = email, message = message).first()
    message = {"message": "Your message was received."}
    if (found is None):
        db.session.add(contact)
        db.session.commit()

    return jsonify(message)

@app.route('/report',  methods=['GET', 'POST'])
def report_issue():
    if (request.method == 'GET'):
        return render_template("Report-Issues.html")
    data = request.json
    name = data['name']
    email = data['email']
    message = data['message']
    report = Report(name, email, message)
    found = Report.query.filter_by(name = name, email = email, message = message).first()
    message = {"message": "Your issue was reported. \nOur team will get back to you soon."}
    if (found is None):
        db.session.add(report)
        db.session.commit()
    return redirect('/')


@app.route('/login', methods=['GET', 'POST'])
def auth_user():
    if request.method == 'GET':
        return render_template("UserLogin.html")
    data = request.json
    user_name = data['user_name']
    password = data['password']
    dummy = "d"
    found = User.query.filter_by(user_name = user_name).first()
    if found is None:
        return jsonify({"error": 1, "message" : "Invalid credentials"})
    if not bcrypt.check_password_hash(found.hashed_password,password):
        return jsonify({"message": "Invalid credentials"})
    return jsonify({"error": 0, "message": "Welcome back " + found.first_name+"!"})


@app.route('/register', methods=['GET', 'POST'])
def create_user():
    if request.method == 'GET':
        return render_template('UserReg.html')
    data = request.json
    email = data['email']
    user_name = data['user_name']
    existingUser = User.query.filter_by(user_name=user_name).first()
    if existingUser is not None:
        return jsonify({"error": 1, "message": "An account associated with this username already exists."})
    existingEmail = User.query.filter_by(email=email).first()
    if existingEmail is not None:
        return jsonify({"error": 2, "message": "An account associated with this email already exists."})
    first_name = data['first_name']
    last_name = data['last_name']
    password = data['password']
    date_of_birth = data['dob']
    user = User(first_name, last_name, user_name, email, date_of_birth, password)
    db.session.add(user)
    db.session.commit()
    return "login"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    user_name = db.Column(db.String(128), unique=True)
    email = db.Column(db.String(128), unique=True)
    hashed_password = db.Column(db.String(128))
    date_of_birth = db.Column(db.String(128))

    def __init__(self, first_name, last_name, user_name, email, date_of_birth, password):
        self.user_name = user_name
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = date_of_birth
        self.email = email
        self.hashed_password = bcrypt.generate_password_hash(password)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    email = db.Column(db.String(128))
    message = db.Column(db.String(128))

    def __init__(self, name, email, message):
        self.name = name
        self.message = message
        self.email = email

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    email = db.Column(db.String(128))
    message = db.Column(db.String(128))

    def __init__(self, name, email, message):
        self.name = name
        self.message = message
        self.email = email
