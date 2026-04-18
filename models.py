from flask import request

@app.route('/')
def index():
    return 'Index Page'

@app.route('/treinos')
def treinos():
    

