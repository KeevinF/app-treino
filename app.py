from flask import Flask, render_template, redirect, url_for, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import json
import os

app = Flask (__name__)
app.config["JWT_SECRET_KEY"] = "super-secret" 
jwt = JWTManager(app)

# Arquivo para armazenar dados de personalização do personal
PERSONALIZATION_FILE = 'personalization_data.json'

def load_personalization_data():
    if os.path.exists(PERSONALIZATION_FILE):
        with open(PERSONALIZATION_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_personalization_data(data):
    with open(PERSONALIZATION_FILE, 'w') as f:
        json.dump(data, f, indent=4)


@app.route('/')
def login():
    return render_template('login.html')

@app.route('/logar', methods=['POST'])
def logar():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user_type = request.json.get("user_type", "aluno")  # personal ou aluno
    
    # Dados de teste
    personal_credentials = {"personal@teste.com": "teste"}
    aluno_credentials = {"teste@teste.com": "teste"}
    
    if user_type == "personal":
        if username not in personal_credentials or personal_credentials[username] != password:
            return jsonify({"msg": "Personal ou senha incorreta"}), 401
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token, user_type="personal")
    else:
        if username != "teste@teste.com" or password != "teste":
            return jsonify({"msg": "Usuario ou senha incorreta"}), 401
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token, user_type="aluno")

@app.route('/personal', methods=['GET'])
@jwt_required()
def personal_dashboard():
    identity = get_jwt_identity()
    return render_template('personal_dashboard.html')

@app.route('/api/personalization', methods=['GET'])
def get_personalization():
    data = load_personalization_data()
    return jsonify(data)

@app.route('/api/personalization', methods=['POST'])
@jwt_required()
def save_personalization():
    identity = get_jwt_identity()
    data = request.json
    
    personalization_data = load_personalization_data()
    personalization_data[identity] = data
    save_personalization_data(personalization_data)
    
    return jsonify({"msg": "Personalização salva com sucesso"}), 200

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