from auth import ResolveUserWithId

import json
from uuid import uuid4

class Book:

    def __init__(self,
		 id=uuid4(),
                 name = "Книга",
                 description = "Описание книги",
                 owner = 0):
        self.id = id
        self.name = name
        self.description = description
        self.owner = owner

    def Serialize(self):
        res = {}
        res['id'] = self.id
        res['name'] = self.name
        res['description'] = self.description
        res['owner'] = ResolveUserWithId(self.owner).Serialize()
        return res

    def Dump(self):
        return json.dumps(self.Serialize())


def CreateBookFromRow(row):
	return Book(id=row['id']
		    name=row['name'],
		    description=row['description'],
   		    owner=row['owner_id'])
