from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask import jsonify
from flask_cors import CORS
from flask import session, url_for, redirect, render_template
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:mira@127.0.0.1:3306/users'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['DEBUG'] = True
app.secret_key = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'

class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    timing = db.Column(db.String(128))
    team_1_id = db.Column(db.String(128))
    team_2_id = db.Column(db.String(128))

    def __init__(self, name, timing, team_1_id, team_2_id):
        self.name = name
        self.timing = timing
        self.team_1_id = team_1_id
        self.team_2_id = team_2_id

@app.route('/checkLogin')
def user_logged_in():
    if "user_name" in session:
        user = User.query.filter_by(user_name=session["user_name"]).first()
        temp = user_schema.dump(user)
        temp["found"] = True
        return jsonify(temp)
    return jsonify({"found": False})

@app.route('/')
def home():
    return render_template("Homepage.html")

@app.route('/idlelogout', methods=['GET'])
def idle_logout():
    return render_template("idlelogout.html")

@app.route('/logout')
def log_out():
    session.pop("user_name", None)
    return redirect("/")

@app.route('/contact',  methods=['GET', 'POST'])
def contact_info():
    if request.method == "GET":
        return render_template("Contact-Us.html")
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

@app.route('/about',  methods=['GET'])
def about():
    return render_template("About.html")

@app.route('/TandC',  methods=['GET'])
def TandC():
    return render_template("Terms-and-Conditions.html")

@app.route('/vision',  methods=['GET'])
def vision():
    return render_template("Vision.html")

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
    return jsonify(message)

@app.route('/checkUserName',methods=['POST'])
def get_user_name():
    if (request.method == 'POST'):
        data = request.json
        user_name = data["user_name"]
        currUser = User.query.filter_by(user_name=session["user_name"]).first()
        if user_name == currUser.user_name:
            return jsonify({"found": False})

        user = User.query.filter_by(user_name=user_name).first()
        if user is not None:
            return jsonify({"found": True})
        return jsonify({"found": False})

@app.route('/deleteUser', methods=['GET'])
def delete_user():
    currUser = User.query.filter_by(user_name=session["user_name"]).first()
    db.session.delete(currUser)
    db.session.commit()
    session.pop("user_name",None)
    return jsonify({"message": "User was deleted successfully"})

@app.route('/checkEmail' , methods=['POST'])
def get_user_email():
    if (request.method == 'POST'):
        data = request.json
        email = data["email"]
        currUser = User.query.filter_by(user_name=session["user_name"]).first()
        print("email",email,len(email))
        print("currUser",currUser.email,len(currUser.email))
        print (email == currUser.email)
        if email == currUser.email:
            return jsonify({"found": False})

        user = User.query.filter_by(email=email).first()
        if (user is not None):
            return jsonify({"found": True})
        return jsonify({"found": False})


@app.route('/login', methods=['GET', 'POST'])
def auth_user():
    if request.method == 'GET':
        return render_template("UserLogin.html")
    data = request.json
    user_name = data['user_name']
    password = data['password']
    found = User.query.filter_by(user_name=user_name).first()
    if found is None:
        return jsonify({"error": 1, "message" : "Invalid credentials"})
    if not bcrypt.check_password_hash(found.hashed_password,password):
        return jsonify({"message": "Invalid credentials"})
    session['user_name'] = user_name
    return "/"


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

@app.route('/reserve',methods=['GET','POST'])
def show_reserve():
    if request.method == 'GET':
        return render_template("Reserve-Court-Field.html")
    if request is None or request.json is None:
        return
    data = request.json
    print(data)
    name = data["name"]
    email = data["email"]
    number = data["number"]
    date = data["date"]
    court = data["court"]
    time = data["time"]
    reservation = Reservation(name, email, number, date, court, time)
    db.session.add(reservation)
    db.session.commit()
    return jsonify(reservations_schema.dump([reservation]))

@app.route('/updateReserve',methods=['POST']) #update court and field reservation table given date and court/field
def update_table():
    data = request.json
    date = data["date"]
    court = data["court"]
    reservations = Reservation.query.filter_by(date =date, court = court).all()
    return jsonify(reservations_schema.dump(reservations))

@app.route('/tickets', methods=['GET', 'POST'])
def get_tickets():
    if request.method == 'GET':
        return render_template("Ticket-Purchase.html")
    elif request.method == 'POST':
        data = request.json
        name = data["name"]
        email = data["email"]
        number = data["number"]
        match = data["match"]
        ticket = Ticket(name, email, number, match)
        db.session.add(ticket)
        db.session.commit()
@app.route('/payment', methods=['GET', 'POST'])
def get_payment():
    if not user_logged_in():
        return redirect("login")
    if request.method == 'GET':
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
    name_on_card = data['credit_card_name']
    credit_card_number = data['credit_card_number']
    exp_month = data['exp_month']
    exp_year = data['exp_year']
    cvv = data['cvv']
    info = PaymentInfo(full_name, email, address, city, state, zip_code, name_on_card, credit_card_number, exp_month, exp_year, cvv)
    db.session.add(info)
    db.session.commit()
    message = {"error": 0, "message": "The information has been successfully saved."}
    return jsonify(message)


@app.route('/getmatches',  methods=['GET'])
def get_match():
    upcoming_matches = Match.query.all()
    return render_template('matches.html', upcoming_matches = upcoming_matches)

@app.route('/postmatches', methods=['GET', 'POST'])
def post_match():
    if request.method == 'GET':
        return render_template("matches_form.html")

    data = request.json
    name = data['name']
    timing = data['timing']
    team_1_id = data['team_1_id']
    team_2_id = data['team_2_id']

    check_name = Match.query.filter(Match.name == name).first()
    if check_name is not None:
        print("Name already exists.")
        return 'getmatches'
    
    match = Match(name, timing, team_1_id, team_2_id)
    db.session.add(match)
    db.session.commit()
    return 'getmatches'

@app.route('/deletematch', methods=['GET', 'POST'])
def delete_match():
    games = Match.query.all()
    if request.method == 'GET':
        return render_template("delete_matches_form.html",
                                games = games)

    data = request.json
    name = data['name']

    Match.query.filter(Match.name == name).delete()
    db.session.commit()
    return 'getmatches'

@app.route('/updatematch', methods=['GET', 'POST'])
def update_match():
    games = Match.query.all()
    if request.method == 'GET':
        return render_template("update_matches_form.html",
                                games = games)

    data = request.json
    name = data['name']
    timing = data['timing']
    team_1_id = data['team_1_id']
    team_2_id = data['team_2_id']

    updated_match = Match.query.filter_by(name=name).first()
    updated_match.timing = timing
    updated_match.team_1_id = team_1_id
    updated_match.team_2_id = team_2_id
    db.session.commit()
    return 'getmatches'

@app.route('/checkPayment', methods=['GET'])
def check_payment():
    user_name = session["user_name"]
    payment = PaymentInfo.query.filter_by(user_name=user_name).first()
    found = True
    if (payment is None):
        found = False
    return jsonify({"found" : found})
    
@app.route('/store', methods=['GET'])
def open_store():
    return render_template("Online-Store.html")

@app.route('/cart', methods=['GET'])
def open_cart():
    return render_template("Shopping-Cart.html")

@app.route('/account', methods=['GET', 'POST'])
def account():
    if request.method == 'GET':
        return render_template("Account.html")

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    email = db.Column(db.String(128))
    number = db.Column(db.String(128))
    match = db.Column(db.String(128))

    def __init__(self, name, email, number, match):
        self.name = name
        self.email = email
        self.number = number
        self.match = match

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

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    email = db.Column(db.String(128))
    number = db.Column(db.String(128))
    date = db.Column(db.String(128))
    court= db.Column(db.String(128))
    time = db.Column(db.String(128))
    def __init__(self, name, email, number,date,court,time):
        self.name = name
        self.number = number
        self.email = email
        self.date = date
        self.court = court
        self.time = time

class PaymentInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(128))
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
        self.user_name = session["user_name"]
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

class UserSchema(ma.Schema):
    class Meta:
        fields = ("first_name", "last_name", "email", "user_name")
        model = User

class MatchSchema(ma.Schema):
    class Meta:
        fields = ("name", "timing")
        model = Match

class ReservationSchema(ma.Schema):
    class Meta:
        fields =("name", "date","court","time")
        model = Reservation

user_schema = UserSchema()
matches_schema = MatchSchema(many=True)
reservations_schema = ReservationSchema(many=True)