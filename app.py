from flask import Flask, request, jsonify, session, url_for, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# connecting to database
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:slenderman@127.0.0.1:3306/eece430'
db = SQLAlchemy(app)

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

@app.route('/')
def home():
    return render_template('profiles.html')

@app.route('/getprofiles',  methods=['GET'])
def get_match():
    coaches = Coach.query.all()
    players = Player.query.all()
    return render_template('profiles.html',
                            coaches = coaches,
                            players = players)

@app.route('/postplayer', methods=['GET', 'POST'])
def post_player():
    if request.method == 'GET':
        return render_template("player_form.html")

    data = request.json
    name = data['name']
    height = data['height']
    age = data['age']
    attack = data['attack']
    defense = data['defense']
    team_name = data['team_name']
    
    player = Player(name, height, age, attack, defense, team_name)
    db.session.add(player)
    db.session.commit()
    return 'getprofiles'

@app.route('/postcoach', methods=['GET', 'POST'])
def post_coach():
    if request.method == 'GET':
        return render_template("coach_form.html")

    data = request.json
    name = data['name']
    team_name = data['team_name']
    wins = data['wins']
    losses = data['losses']
    
    coach = Coach(name, team_name, wins, losses)
    db.session.add(coach)
    db.session.commit()
    return 'getprofiles'
