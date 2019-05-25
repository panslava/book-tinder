
import json
import datetime

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

	def get_age(birthday):
    		today = date.today()
    		age = today.year - birthday.year
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
        res['avatar'] = self.avatarName
	res['age'] = get_age(self.birthday)
        return res

    def Dump(self):
        return json.dumps(self.Serialize()).encode('utf-8')

def CreateUserFromRow(row):
    return User(id=row['id'],
                hash=row['hash'],
                avatar=row['avatar'],
                nickname=row['login'],
                password=row['password'],
                displayName=row['display_name'],
                gender=row['gender'],
                birthday=row['birthday'])
