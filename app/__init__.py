from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:rootroot@127.0.0.1:3306/scms'
CORS(app)

db = SQLAlchemy(app)

from app import routes