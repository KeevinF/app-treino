from flask import Flask, render_template, redirect, url_for, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask (__name__)
app.config["JWT_SECRET_KEY"] = "super-secret" 
jwt = JWTManager(app)


@app.route('/')
def login():
    return render_template('login.html')

@app.route('/logar', methods=['POST'])
def logar():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "teste@teste.com" or password != "teste":
        return jsonify({"msg": "Usuario ou senha incorreta"}), 401
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)
    # return redirect(url_for('index'))

@app.route('/index', methods=['GET'])
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