import psycopg2
from flask import Flask, render_template


app = Flask(__name__)

@app.route("/")
def main():
    # connecting to database
    conn = psycopg2.connect(database='EECE 430 SCMS',
                            user='postgres',
                            password='slenderman',
                            host='127.0.0.1',
                            port='5432')
    cursor = conn.cursor()

    # getting all matches in the database: currently 3
    cursor.execute('select * from upcoming_matches')
    matches = cursor.fetchall()
    
    # getting team timings for the 3 games to display
    game_1_time = matches[0][2]
    game_2_time = matches[1][2]
    game_3_time = matches[2][2]
    
    # first match
    game_1_team_1_id = matches[0][3]
    game_1_team_2_id = matches[0][4]  
    # getting team names
    cursor.execute('SELECT name FROM team where id = \'' + str(game_1_team_1_id) + '\'')
    game_1_team_1_name = (cursor.fetchall())[0][0]
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_1_team_2_id) + '\'')
    game_1_team_2_name = (cursor.fetchall())[0][0]
    
    # second match
    game_2_team_1_id = matches[1][3]
    game_2_team_2_id = matches[1][4]  
    # getting team names
    cursor.execute('SELECT name FROM team where id = \'' + str(game_2_team_1_id) + '\'')
    game_2_team_1_name = (cursor.fetchall())[0][0]
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_2_team_2_id) + '\'')
    game_2_team_2_name = (cursor.fetchall())[0][0]
    
    # third match
    game_3_team_1_id = matches[2][3]
    game_3_team_2_id = matches[2][4]  
    # getting team names
    cursor.execute('SELECT name FROM team where id = \'' + str(game_3_team_1_id) + '\'')
    game_3_team_1_name = (cursor.fetchall())[0][0]
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_3_team_2_id) + '\'')
    game_3_team_2_name = (cursor.fetchall())[0][0]
        
    # getting the images of each team
    # first match
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_1_team_1_id) + '\'')
    game_1_team_1_icon = (cursor.fetchall())[0][0]
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_1_team_2_id) + '\'')
    game_1_team_2_icon = (cursor.fetchall())[0][0]
    
    # second match
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_2_team_1_id) + '\'')
    game_2_team_1_icon = (cursor.fetchall())[0][0]
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_2_team_2_id) + '\'')
    game_2_team_2_icon = (cursor.fetchall())[0][0]
    
    # third match
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_3_team_1_id) + '\'')
    game_3_team_1_icon = (cursor.fetchall())[0][0]
    cursor.execute('SELECT icon FROM team where id = \'' + str(game_3_team_2_id) + '\'')
    game_3_team_2_icon = (cursor.fetchall())[0][0]

    # rendering data on html file
    return render_template("index.html",
                           cc = 'Upcoming Matches',
                           game_1_time = game_1_time,
                           game_2_time = game_2_time,
                           game_3_time = game_3_time,
                           game_1_team_1_name = game_1_team_1_name,
                           game_1_team_2_name = game_1_team_2_name,
                           game_2_team_1_name = game_2_team_1_name,
                           game_2_team_2_name = game_2_team_2_name,
                           game_3_team_1_name = game_3_team_1_name,
                           game_3_team_2_name = game_3_team_2_name,
                           game_1_team_1_icon = game_1_team_1_icon,
                           game_1_team_2_icon = game_1_team_2_icon,
                           game_2_team_1_icon = game_2_team_1_icon,
                           game_2_team_2_icon = game_2_team_2_icon,
                           game_3_team_1_icon = game_3_team_1_icon,
                           game_3_team_2_icon = game_3_team_2_icon
                           )

if __name__ == "__main__":
    app.run()

