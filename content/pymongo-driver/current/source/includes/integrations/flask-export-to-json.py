import sqlite3
import json

# Connect to the SQLite database
db_path = 'relative/path/to/site.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Export data from the 'post' table
cursor.execute("SELECT * FROM post")
rows = cursor.fetchall()

# Get the column names
column_names = [description[0] for description in \
                cursor.description]

# Convert to list of dictionaries
data = [dict(zip(column_names, row)) for row in rows]

# Save to a JSON file
with open('post.json', 'w') as f:
    json.dump(data, f, indent=4)

# Close the connection
conn.close()
