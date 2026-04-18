from flask import session


@app.route('/')
def index():
    if 'username' in session:
        return f'Conectado na sessao como {session["username"]}'
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return '''
        <form method="post>
        <p><input type=text name=username>
        <p><input type=submit value=Login>
        </form>
'''

app.route('/logout')
def logout():
    session.pop('username', None)
