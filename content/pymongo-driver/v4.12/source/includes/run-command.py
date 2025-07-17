# start-hello
database = client.get_database("my_db")

hello = database.command("hello")

print(hello)
# end-hello

# start-readpref
from pymongo.read_preferences import Secondary

database = client.get_database("my_db")

hello = database.command("hello", read_preference=Secondary())

print(hello)
# end-readpref

# start-cursor-command
database = client.get_database("sample_mflix")

result = database.cursor_command("find", "movies", filter={"runtime": 11})

print(result.to_list())
# end-cursor-command

# start-runcommand
database = client.get_database("sample_mflix")

result = database.command("dbStats")

print(result)
# end-runcommand