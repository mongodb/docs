val ejsonStr = """
    {"_id": {"${"$"}oid": "6035210f35bd203721c3eab8"},
    "name": "Gabriel García Márquez",
    "dateOfDeath": {"${"$"}date": "2014-04-17T04:00:00Z"},
    "novels": [
        {"title": "One Hundred Years of Solitude","yearPublished": 1967},
        {"title": "Chronicle of a Death Foretold","yearPublished": 1981},
        {"title": "Love in the Time of Cholera","yearPublished": 1985}]}
    """.trimIndent()

val author = JsonObject(ejsonStr)
