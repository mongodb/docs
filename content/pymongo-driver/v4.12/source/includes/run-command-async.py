# start-hello
database = client.get_database("my_db")

hello = await database.command("hello")

print(hello)
# end-hello

# start-cursor-command
database = client.get_database("sample_mflix")

result = await database.cursor_command("find", "movies", filter={"runtime": 11})

print(result.to_list())
# end-cursor-command

# start-runcommand
database = client.get_database("sample_mflix")

result = await database.command("dbStats")

print(result)
# end-runcommand