from flask import Flask, render_template
from flask_livereload import LiveReload

app = Flask (__name__)
app.secret_key = 'dev'
LiveReload(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/treinos')
def treinos():
    return render_template('treinos.html')


if __name__ == '__main__':
    app.run(debug=True)