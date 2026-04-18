from flask import Flask, render_template

app = Flask (__name__)
app.secret_key = 'dev'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/treinos')
def treinos():
    return render_template('treinos.html')


if __name__ == '__main__':
    app.run(debug=True)