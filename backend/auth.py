from models.user import User

from models.user import CreateUserFromRow
import db

def ResolveUserWithHash(hash):
    db.cursor.execute(f"SELECT * FROM users WHERE hash = '{hash}'")
    for row in db.cursor:
        return CreateUserFromRow(row)

def ResolveUserWithLogPass(login, password):
    db.cursor.execute(f"SELECT * FROM users WHERE login = '{login}' and password = '{password}'")
    for row in db.cursor:
        return CreateUserFromRow(row)

def ResolveUserWithId(id):
    db.cursor.execute(f"SELECT * FROM users WHERE id = '{id}'")
    for row in db.cursor:
        return CreateUserFromRow(row)