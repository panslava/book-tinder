
import json
import datetime
from datetime import date

from uuid import uuid4

class User:

	def __init__(self,
		id = 0,
		hash = hash(uuid4()),
		avatar = "avatar",
		nickname = "nick",
		password = "pass",
		displayName = "Пользователь",
		gender = "female",
		birthday = datetime.date(1998, 3, 11)):
		
		self.uid = id
		self.displayName = displayName
		self.nickname = nickname
		self.password = password
		self.hash = hash
		self.avatarName = avatar
		self.gender = gender
		self.birthday = birthday

	def get_age(self, birthday):
		today = date.today()
		age = date.today().year - birthday.year
		if today.month < birthday.month:
			age -= 1
		elif today.month == birthday.month and today.day < birthday.day:
			age -= 1
		return age

	def Serialize(self):
		res = {}
		res['uid'] = self.uid
		res['nickname'] = self.nickname
		res['displayName'] = self.displayName
		res['gender'] = self.gender
		res['birthday'] = str(self.birthday)
		res['avatar'] = "/static/avatars/" + self.avatarName
		res['age'] = self.get_age(self.birthday)
		res['hash'] = self.hash
		return res
	
	def Dump(self):
		return json.dumps(self.Serialize(), ensure_ascii=False)

def CreateUserFromRow(row):
    id = row.get('owner_id', None)
    if not id:
          id = row['id']
    return User(id=id,
                hash=row['hash'],
                avatar=row['avatar'],
                nickname=row['login'],
                password=row['password'],
                displayName=row['display_name'],
                gender=row['gender'],
                birthday=row['birthday'])
