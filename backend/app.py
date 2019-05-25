from flask import Flask
from flask import request
from flask import make_response
from flask import redirect
from flask import url_for
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

import db

import json
import random

from models.user import User, CreateUserFromRow
from models.book import Book, CreateBookFromRow, GetBookById
from auth import ResolveUserWithId, ResolveUserWithHash, ResolveUserWithLogPass

def Fail(code, message):
    return {'error': {
        'code': code,
        'message': message
    }}

@app.route('/request_user')
def requestUserHandle():
    user = None
    if request.headers.get('Auth', None):
        user = ResolveUserWithHash(request.headers['Auth'])
    elif request.args.get('hash', None):
        user = ResolveUserWithHash(request.args['hash'])
    elif request.args.get('login', None) and request.args.get('password', None):
        user = ResolveUserWithLogPass(request.args['login'], request.args['password'])
    if not user:
        return json.dumps(Fail('user_not_found', 'No such user'))
    else:
        response = make_response(user.Dump())
        response.set_cookie('Auth', str(user.hash))
        return response

def getUserByHeaders(headers, cookies):
	auth = headers.get('Auth', None)
	if not auth:
		auth = cookies.get('auth', None)
	if not auth:
		return None
	user = ResolveUserWithHash(auth)
	return user

@app.route('/cards')
def cardsHandle():
	user = getUserByHeaders(request.headers, request.cookies)
	if not user:
		return json.dumps(Fail('unautorized', 'User is not authorized'))
	db.cursor.execute(f"SELECT * FROM books JOIN users on books.owner_id = users.id WHERE owner_id != {user.uid}")
	res = {'books': []}
	for row in db.cursor:
		res['books'].append(CreateBookFromRow(row, False).Serialize())
	random.shuffle(res['books'])
	return json.dumps(res, ensure_ascii=False)

@app.route('/my_books')
def myBooksHandle():
	user = getUserByHeaders(request.headers, request.cookies)
	if not user:
		return json.dumps(Fail('unautorized', 'User is not authorized'))
	db.cursor.execute(f"SELECT * FROM books WHERE owner_id = {user.uid}")
	res = {}
	res['me'] = user.Serialize()
	res['books'] = []
	for row in db.cursor:
		res['books'].append(CreateBookFromRow(row, False).Serialize())
	return json.dumps(res, ensure_ascii=False)

@app.route('/matches')
def matchesHandle():
	user = getUserByHeaders(request.headers, request.cookies)
	if not user:
		return json.dumps(Fail('unautorized', 'User is not authorized'))
	db.cursor.execute(f"SELECT * FROM likes WHERE B = {user.uid}")
	peopleLikedMe = db.cursor.fetchall()
	db.cursor.execute(f"SELECT * FROM likes WHERE A = {user.uid}")
	peopleILiked = db.cursor.fetchall()
	iLiked = set()
	for row in peopleILiked:
		iLiked.add(row['B'])
	res = {'matches': []}
	for id in iLiked:
		match = {'user': ResolveUserWithId(id).Serialize(), 'books': {'iLiked': [], 'matchLiked': []}}
		booksMatchLiked = set()
		commonPeople = set()
		for row in peopleLikedMe:
			if row['A'] == id and row['B'] == user.uid:
				commonPeople.add(id)
				book = GetBookById(row['book'])
				book.owner = 0
				booksMatchLiked.add(book)
		match['books']['matchLiked'] = [book.Serialize() for book in booksMatchLiked]
		booksILiked = set()
		for row in peopleILiked:
			if id in commonPeople and row['A'] == user.uid and row['B'] == id:
				book = GetBookById(row['book'])
				book.owner = 0
				booksILiked.add(book)
		match['books']['iLiked'] = [book.Serialize() for book in booksILiked]
		res['matches'].append(match)
	return json.dumps(res, ensure_ascii=False)

@app.route('/')
def hello_world():
    user = User()
    return str(user.uid)

if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000)
