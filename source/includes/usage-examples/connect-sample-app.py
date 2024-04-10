from pymongo import MongoClient

try:
    # start example code here

    # end example code here

    client.admin.command("ping")
    print("Connected successfully")

    # other application code

    client.close()

except Exception as e:
    raise Exception(
        "The following error occurred: ", e)
