command = {
    "collMod": "weather24h",
    "expireAfterSeconds": 7200  # Set expiration to 2 hours (7200 seconds)
}

result = database.command(command)
