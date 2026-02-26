import sqlite3

# Connect to the SQLite database
db_path = 'relative/path/to/site.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Query to get all table names
cursor.execute("SELECT name FROM sqlite_master WHERE \
               type='table';")
tables = cursor.fetchall()

# Close the connection
conn.close()

print(tables)
