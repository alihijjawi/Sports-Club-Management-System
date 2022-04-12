from flask import render_template
from flask import request
from flask import jsonify
from app import app, db

class Form(db.Model):
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

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json

    company_name = data['company_name']
    point_of_contact = data['point_of_contact']
    billing_address = data['billing_address']
    phone_number = data['phone_number']
    email = data['email']
    website = data['website']

    form = Form(company_name, point_of_contact, billing_address, phone_number, email, website)

    db.session.add(form)
    db.session.commit()

    message = {"error": 0, "message": "The form has been successfully submitted."}
    return message