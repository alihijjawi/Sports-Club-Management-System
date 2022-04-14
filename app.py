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
def update_coach():
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
def delete_coach():
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