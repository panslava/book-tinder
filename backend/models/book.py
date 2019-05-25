from auth import ResolveUserWithId

import db

import json
from uuid import uuid4

class Book:
	def __init__(self,
			id=uuid4(),
			title = "Книга",
			author = "Автор",
			description = "Описание книги",
			owner = 0,
			pic = 'dickpic.jpg'):
		self.id = id
		self.title = title
		self.author = author
		self.description = description
		self.owner = owner
		self.pic = pic

	def Serialize(self):
		res = {}
		res['id'] = self.id
		res['title'] = self.title
		res['author'] = self.author
		res['description'] = self.description
		if self.owner:
			res['owner'] = ResolveUserWithId(self.owner).Serialize()
		res['pic'] = '/static/books/' + self.pic
		return res

	def Dump(self):
		return json.dumps(self.Serialize(), ensure_ascii=False)

	def __hash__(self):
		return hash(id)


def CreateBookFromRow(row, withOwner = True) -> Book:
	return Book(id=row['id'],
		    title=row['title'],
		    author=row['author'],
		    description=row['description'],
   		    owner=row['owner_id'] if withOwner else 0,
		    pic=row['photo'])

def GetBookById(id) -> Book:
	db.cursor.execute(f'SELECT * FROM books WHERE id = {id}')
	for row in db.cursor:
		return CreateBookFromRow(row)
