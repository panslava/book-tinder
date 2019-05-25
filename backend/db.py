import MySQLdb

conn = MySQLdb.connect(host="localhost",
                       user="admin_admin",
                       passwd="2xIKC6xewN",
                       db="admin_gachihack",
		       use_unicode=True,
		       charset='utf8')

cursor = conn.cursor(MySQLdb.cursors.DictCursor)
