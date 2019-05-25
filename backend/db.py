import MySQLdb

conn = MySQLdb.connect(host="localhost",
                       user="admin_admin",
                       passwd="2xIKC6xewN",
                       db="admin_gachihack")

cursor = conn.cursor(MySQLdb.cursors.DictCursor)
