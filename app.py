from flask import Flask, render_template, redirect, url_for

app = Flask (__name__)
app.secret_key = 'dev'

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/logar', methods=['POST'])
def logar():
    return redirect(url_for('index'))

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/treinos')
def treinos():
    return render_template('treinos.html')

@app.route('/cardio')
def cardio():
    return render_template('cardio.html')

@app.route('/avaliacoes')
def avaliacoes():
    return render_template('avaliacoes.html')


@app.route('/dieta')
def dieta():
    return render_template('dieta.html')

@app.route('/arquivos')
def arquivos():
    return render_template('arquivos.html')

@app.route('/fatura')
def fatura():
    return render_template('fatura.html')

if __name__ == '__main__':
    app.run(debug=True)