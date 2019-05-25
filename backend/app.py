from flask import Flask
from flask import request
from flask import make_response
from flask import redirect
from flask import url_for

app = Flask(__name__)

import db

import json

from models.user import User, CreateUserFromRow
from models.book import Book, CreateBookFromRow
from auth import ResolveUserWithHash, ResolveUserWithLogPass

def Fail(code, message):
    return {'error': {
        'code': code,
        'message': message
    }}

@app.route('/request_user')
def requestUserHandle():
    user = None
    if request.cookies.get('auth', None):
        user = ResolveUserWithHash(request.cookies['auth'])
    elif request.args.get('hash', None):
        user = ResolveUserWithHash(request.args['hash'])
    elif request.args.get('login', None) and request.args.get('password', None):
        user = ResolveUserWithLogPass(request.args['login'], request.args['password'])
    if not user:
        return json.dumps(Fail('user_not_found', 'No such user'))
    else:
        response = make_response(user.Dump())
        response.set_cookie('auth', str(user.hash))
        return response

@app.route('/avatar')
def getAvatarHandle():
    id = request.args['id']
    return redirect('/static/avatar/' + id + '.jpg')

@app.route('/cards')
def cardsHandle():
	auth = request.cookies.get('auth', None)
	if not auth:
		return json.dumps(Fail("unauthorized", "User is not authorized"))
	user = ResolveUserWithHash(auth)
	db.cursor.execute(f"SELECT * FROM books JOIN users on books.owner_id = users.id WHERE owner_id != {user.uid}")
	res = {'books': []}
	for row in db.cursor:
		res['books'].append(CreateBookFromRow(row).Serialize())
	return json.dumps(res)

@app.route('/')
def hello_world():
    user = User()
    return str(user.uid)

if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000)
