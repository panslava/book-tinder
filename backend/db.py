import MySQLdb

conn = MySQLdb.connect(host="194.67.202.99",
                       user="admin_admin",
                       passwd="lA5733vyKI",
                       db="admin_gachihack")

cursor = conn.cursor(MySQLdb.cursors.DictCursor)