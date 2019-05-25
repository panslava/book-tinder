
booksById = {}

def RegisterBook(user, book):
    booksById[book.id] = book
    return book

def RemoveBook(book):
    del booksById[book]

def GetBookById(id):
    return booksById[id]

def AllBooksOfUser(uid):
    res = []
    for book in booksById:
        if booksById[book].owner == uid:
            res.append(booksById[book])
    return res