from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask import jsonify
from flask_cors import CORS
from flask import session, url_for, redirect, render_template
from flask_marshmallow import Marshmallow

import jwt
from datetime import datetime
from dateutil import parser

import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')



app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:mira@127.0.0.1:3306/users'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['DEBUG'] = True
app.secret_key = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'
SECRET_KEY = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'



def create_token(user_id):
 payload = {
 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=4),
 'iat': datetime.datetime.utcnow(),
 'sub': user_id
 }
 return jwt.encode(
    payload,
    SECRET_KEY,
    algorithm='HS256'
 )

def extract_auth_token(authenticated_request):
 auth_header = authenticated_request.headers.get('Authorization')
 if auth_header:
    return auth_header.split(" ")[1]
 else:
    return None

def decode_token(token):
 payload = jwt.decode(token, SECRET_KEY, 'HS256')
 return payload['sub']


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

class Events(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    event_name = db.Column(db.String(128))
    event_location = db.Column(db.String(128))
    event_time = db.Column(db.String(128))

    def __init__(self, event_name, event_location, event_time):
        self.event_name = event_name
        self.event_location = event_location
        self.event_time = event_time

class Sponsorship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(128))
    point_of_contact = db.Column(db.String(128))
    billing_address = db.Column(db.String(128))
    phone_number = db.Column(db.String(128))
    email = db.Column(db.String(128))
    website = db.Column(db.String(128))

    def __init__(self, company_name, point_of_contact, billing_address, phone_number, email, website):
        self.company_name = company_name
        self.point_of_contact = point_of_contact
        self.billing_address = billing_address
        self.phone_number = phone_number
        self.email = email
        self.website = website

class OnlineStore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(128))
    price = db.Column(db.Float)
    date = db.Column(db.DateTime)

    def __init__(self, item_name, price, date):
        self.item_name = item_name
        self.price = price
        self.date = date

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String(128))
    match = db.Column(db.String(128))
    date = db.Column(db.DateTime)

    def __init__(self, number, match, date):
        self.number = number
        self.match = match
        self.date = date

class Coach(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    team_name = db.Column(db.String(128))
    wins = db.Column(db.Integer)
    losses = db.Column(db.Integer)

    def __init__(self, name, team_name, wins, losses):
        self.name = name
        self.team_name = team_name
        self.wins = wins
        self.losses = losses

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    height = db.Column(db.Integer)
    age = db.Column(db.Integer)
    attack = db.Column(db.Integer)
    defense = db.Column(db.Integer)
    team_name = db.Column(db.String(128))

    def __init__(self, name, height, age, attack, defense, team_name):
        self.name = name
        self.height = height
        self.age = age
        self.attack = attack
        self.defense = defense
        self.team_name = team_name

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    nb_of_players = db.Column(db.Integer)
    coach_id = db.Column(db.Integer)
    wins = db.Column(db.Integer)
    losses = db.Column(db.Integer)

    def __init__(self, name, nb_of_players, coach_id, wins, losses):
        self.name = name
        self.nb_of_players = nb_of_players
        self.coach_id = coach_id
        self.wins = wins
        self.losses = losses

class Discussion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128))
    parent = db.Column(db.Integer)
    content = db.Column(db.String(4000))
    date_added = db.Column(db.String(128))

    def __init__(self, username, parent, content, date_added):
        self.username = username
        self.parent = parent
        self.content = content
        self.date_added = date_added

class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128))
    content = db.Column(db.String(4000))
    date_added = db.Column(db.String(128))

    def __init__(self, username, parent, content, date_added):
        self.username = username
        self.content = content
        self.date_added = date_added



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

class OnlineStoreSchema(ma.Schema):
    class Meta:
        fields = ("item_name", "price", "date")
        model = OnlineStore

class TicketSchema(ma.Schema):
    class Meta:
        fields = ("number", "match", "date")
        model = Ticket

user_schema = UserSchema()
matches_schema = MatchSchema(many=True)
reservations_schema = ReservationSchema(many=True)




@app.route('/changePassword',methods=["POST"])
def check_password():
    data = request.json
    password = data["password"]
    new_password = data["new_password"]
    currUsername = session["user_name"]
    user = User.query.filter_by(user_name=currUsername).first()
    if (not bcrypt.check_password_hash(user.hashed_password,password)):
        return jsonify({"message":"The old account password you entered is incorrect."})
    if (bcrypt.check_password_hash(user.hashed_password,new_password)):
        return jsonify({"message": "You cannot use your old password as your new password."})
    user.hashed_password = bcrypt.generate_password_hash(new_password)
    db.session.commit()
    return jsonify({"message": "Your password has been successfully changed."})




@app.route('/checkLogin')
def user_logged_in():
    print(session)
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
    print(session)
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
    session["user_name"] = user_name
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
        print(data)

        number = data["number"]
        match = data["match"]
        date = datetime.datetime.utcnow()

        ticket = Ticket(number, match, date)
        db.session.add(ticket)
        db.session.commit()

@app.route('/payment', methods=['GET', 'POST'])
def get_payment():
    if request.method == 'GET':
        return render_template("Payment.html")
    return redirect("login")
    
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

@app.route('/returnMatches', methods=['GET'])
def return_matches():
    matches = Match.query.all()
    return jsonify(matches_schema.dump(matches))


@app.route('/getmatches',  methods=['GET'])
def get_match():
    upcoming_matches = Match.query.all()
    return render_template('matches.html', upcoming_matches= upcoming_matches)

@app.route('/getevents', methods = ['GET', 'POST'])
def get_event():
    upcoming_events = Events.query.all()
    return render_template('events.html', upcoming_events = upcoming_events )

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

@app.route('/postevents', methods = ['GET','POST'])
def post_event():
    if request.method == 'GET':
        return render_template("events_form.html")
    
    data = request.json
    event_name = data['name']
    event_time = data['timing']
    event_location = data['location']

    print(event_time)
    check_event = Events.query.filter(Events.event_time == event_time).first()
    if check_event is not None:
        print("This day is already booked. Please choose another")
        
        return 'getevents'
    event = Events(event_name, event_location, event_time)
    db.session.add(event)
    db.session.commit()
    return 'getevents'

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

@app.route('/deleteevents', methods = ['GET','POST'])
def delete_event():
    events = Events.query.all()
    if request.method == 'GET':
        return render_template("delete_events_form.html",
                                    events = events)
    data = request.json
    event_name = data['name']
    print("NAME IS", event_name)
    Events.query.filter(Events.event_name == event_name).delete()
    print('HERE')
    db.session.commit()
    return 'getevents'

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

@app.route('/updateEvent', methods=['GET', 'POST'])
def update_event():
    events = Events.query.all()
    if request.method == 'GET':
        return render_template("update_event_form.html",
                                events = events)

    data = request.json
    event_name = data['event_name']
    event_time = data['event_time']
    event_location = data['event_location']
   
    updated_event = Events.query.filter_by(event_name=event_name).first()

    
    updated_event.event_time = event_time
    updated_event.event_location = event_location
    db.session.commit()
    return 'getevents'

@app.route('/checkPayment', methods=['GET'])
def check_payment():
    user_name = session["user_name"]
    payment = PaymentInfo.query.filter_by(user_name=user_name).first()
    if (payment is not None):
        credit_card_number = payment.credit_card_number[15:20]
        exp_month = payment.exp_month
        exp_year = payment.exp_year
        return jsonify({"found": True,"credit_card_number": "****"+credit_card_number,"exp":"Expires on "+exp_month+", "+exp_year})
    return jsonify({"found" : False})

@app.route('/removePayment', methods=['GET'])
def remove_payment():
    user_name = session["user_name"]
    PaymentInfo.query.filter_by(user_name=user_name).delete()
    db.session.commit()
    return jsonify({"message":"The payment method has been successfully removed."})

    
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
    else:
        data = request.json
        first_name = data["first_name"]
        last_name = data["last_name"]
        user_name = data["user_name"]
        email = data["email"]
        currUserName = session["user_name"]
        user = User.query.filter_by(user_name=currUserName).first()
        user.first_name = first_name
        user.last_name = last_name
        user.user_name = user_name
        user.email = email
        session["user_name"] = user_name
        print(session)
        db.session.commit()
        return "OK"

@app.route('/getprofiles',  methods=['GET'])
def get_profiles():
    coaches = Coach.query.all()
    players = Player.query.all()
    return render_template('profiles.html',
                            coaches = coaches,
                            players = players)

@app.route('/postplayer', methods=['GET', 'POST'])
def post_player():
    teams = Team.query.all()
    if request.method == 'GET':
        return render_template("player_form.html",
                                teams = teams)

    data = request.json
    name = data['name']
    height = data['height']
    age = data['age']
    attack = data['attack']
    defense = data['defense']
    team_name = data['team_name']
    
    check_name = Player.query.filter(Player.name == name).first()
    if check_name is not None:
        print("Name already exists.")
        return 'getprofiles'
    
    player = Player(name, height, age, attack, defense, team_name)
    db.session.add(player)
    db.session.commit()
    return 'getprofiles'

@app.route('/postcoach', methods=['GET', 'POST'])
def post_coach():
    teams = Team.query.all()
    if request.method == 'GET':
        return render_template("coach_form.html",
                                teams = teams)

    data = request.json
    name = data['name']
    team_name = data['team_name']
    wins = data['wins']
    losses = data['losses']

    check_name = Coach.query.filter(Coach.name == name).first()
    if check_name is not None:
        print("Name already exists.")
        return 'getprofiles'
    
    coach = Coach(name, team_name, wins, losses)
    db.session.add(coach)
    db.session.commit()
    return 'getprofiles'


@app.route('/deleteplayer', methods=['GET', 'POST'])
def delete_player():
    players = Player.query.all()
    if request.method == 'GET':
        return render_template("delete_player_form.html",
                                players = players)

    data = request.json
    name = data['name']
    
    Player.query.filter(Player.name == name).delete()
    db.session.commit()
    return 'getprofiles'

@app.route('/deletecoach', methods=['GET', 'POST'])
def delete_coach():
    coaches = Coach.query.all()
    if request.method == 'GET':
        return render_template("delete_coach_form.html",
                                coaches = coaches)

    data = request.json
    name = data['name']
    
    Coach.query.filter(Coach.name == name).delete()
    db.session.commit()
    return 'getprofiles'

@app.route('/updateplayer', methods=['GET', 'POST'])
def update_player():
    players = Player.query.all()
    teams = Team.query.all()
    if request.method == 'GET':
        return render_template("update_player_form.html",
                                players = players,
                                teams = teams)

    data = request.json
    name = data['name']
    height = data['height']
    age = data['age']
    attack = data['attack']
    defense = data['defense']
    team_name = data['team_name']

    player_match = Player.query.filter_by(name=name).first()
    player_match.height = height
    player_match.age = age
    player_match.attack = attack
    player_match.defense = defense
    player_match.team_name = team_name
    db.session.commit()
    return 'getprofiles'

@app.route('/updatecoach', methods=['GET', 'POST'])
def update_coach():
    coaches = Coach.query.all()
    teams = Team.query.all()
    if request.method == 'GET':
        return render_template("update_coach_form.html",
                                coaches = coaches,
                                teams = teams)

    data = request.json
    name = data['name']
    team_name = data['team_name']
    wins = data['wins']
    losses = data['losses']

    coach_match = Coach.query.filter_by(name=name).first()
    coach_match.team_name = team_name
    coach_match.wins = wins
    coach_match.losses = losses
    db.session.commit()
    return 'getprofiles'

@app.route('/discussion', methods=['GET', 'POST'])
def get_discussion():
    if request.method == 'POST':
        data = request.json
        newpost = Discussion(session['user_name'], data['parent'], data['title'], data['content'], datetime.datetime.utcnow())
        db.session.add(newpost)
        db.session.commit()
    posts = Discussion.query.filter_by(parent=0).all()
    posts.reverse()
    comments=[]
    for p in posts:
        pcomments = Discussion.query.filter_by(parent=p.id).all()
        comments.append(pcomments)
    return render_template('Discussion-Forum.html', posts=posts, comments=comments)    

@app.route('/reviews', methods=['GET', 'POST'])
def get_reviews():
    if request.method == 'POST':    
        data = request.json
        newpost = Reviews(session['user_name'], data['title'], data['content'], datetime.datetime.utcnow())
        db.session.add(newpost)
        db.session.commit()
    reviews = Reviews.query.all()
    return render_template('About.html', reviews=reviews)

@app.route('/sponsors', methods=['GET', 'POST'])
def submit():
    if request.method == "POST":
        data = request.json

        company_name = data['company_name']
        point_of_contact = data['point_of_contact']
        billing_address = data['billing_address']
        phone_number = data['phone_number']
        email = data['email']
        website = data['website']

        form = Sponsorship(company_name, point_of_contact, billing_address, phone_number, email, website)

        db.session.add(form)
        db.session.commit()
    
    return render_template('sponsorship.html')

@app.route('/store_report', methods=['GET', 'POST'])
def store_report():
    if request.method == "POST":
        data = request.json

        start_date = parser.parse(data['start_date'])
        end_date = parser.parse(data['end_date'])

        entries = OnlineStore.query.filter(OnlineStore.date.between(start_date, end_date)).all()
        
        dates = []
        prices = []
        for entry in entries:
            dates.append(entry.date)
            prices.append(entry.price)

        print(dates)
        
        plt.plot_date(dates, prices)
        plt.xlabel("Date")
        plt.ylabel("Revenue ($)")
        plt.gcf().autofmt_xdate()
        plt.savefig('static/images/reports/store_report.png')

    return render_template('store_report.html')

@app.route('/ticket_report', methods=['GET', 'POST'])
def ticket_report():
    if request.method == "POST":
        data = request.json

        start_date = parser.parse(data['start_date'])
        end_date = parser.parse(data['end_date'])

        entries = Ticket.query.filter(Ticket.date.between(start_date, end_date)).all()
        
        dates = []
        prices = []
        for entry in entries:
            dates.append(entry.date)
            prices.append(10 * int(entry.number))
        
        plt.plot_date(dates, prices)
        plt.xlabel("Date")
        plt.ylabel("Revenue ($)")
        plt.gcf().autofmt_xdate()
        plt.savefig('static/images/reports/ticket_report.png')

    return render_template('ticket_report.html')