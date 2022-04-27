# Sports-Club-Management-System
EECE 430: Software Engineering.

Follow these steps to properly operate the SMCS WebApp:

1- clone our github repo from this link: https://github.com/alihijjawi/Sports-Club-Management-System
2- in the outer folder of the repo, enter CMD and create a virtual environment (knowing that you have installed python on your device)
    use the following command: py -3 -m venv venv (on windows)
3- in the repo folder, you should find an "install.txt" which has all the dependencies we need
4- enter the virtual environment through:
    venv\Scripts\Activate
and execute this command:
    pip install -r install.txt
this should install all the dependencies properly
5- create an SQL database with a specific name, lets say: eece430, admin: root, password: root
6- in the app.py, make sure that you change the name of the app.config to:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@127.0.0.1:3306/eece430'
7- in the main folder of the repo, while still in the venv, do the following commands:
    python (in cmd)
then you will be moved to a python script, and execute:
from app import db
    >>> db.create_all()
    >>> exit()
this will create all the tables that you need in the database
8- you can use MySQLWorkbench to properly add base items like admin privileged user, teams, and other classes
9- you should be able to run the venv now on the localhost, execute, while in the venv:
    flask run
and then open your browser to: localhost:5000    OR    127.0.0.1:5000

The WebApp should run smoothly.
From there, you can have multiple scenarios:
- Read the terms and conditions, contact us, report issue, vision, and about
- the homepage shows news about the club and their teams and activities
- you can login using your past credentials, or register as a new user. when you are logged in, you will be able to do more functionalities like events and checking matches in the LOGIN page
- you can become a sponsor for the club by filling in the specific form in the SPONSOR page
- you can look at the club teams and the profiles of players and the team's coaches in the TEAM page
- you can check the upcoming matches in the MATCHES page
- you can check for events held by the club in the EVENTS page
- enter the shop, browse items and add them to the shopping cart, update the shopping cart and move to putting in your credit card number and do a working purchase
- while logged in you can:
    ~ save credit card info in the PURCHASE-FORM of the STORE page
    ~ reserve different sports fields at the club arena with specific set times in the RESERVE page
    ~ you can write on a discussion forum in the DISCUSSIONS page
    ~ modify you account credentials in the ACCOUNT page
