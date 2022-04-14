from flask import Flask, request, jsonify, session, url_for, redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# connecting to database
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:slenderman@127.0.0.1:3306/eece430'
db = SQLAlchemy(app)

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

@app.route('/')
def home():
    return render_template('matches.html')

@app.route('/getmatches',  methods=['GET'])
def get_match():
    upcoming_matches = Match.query.all()
    return render_template('matches.html',
                            upcoming_matches = upcoming_matches)

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