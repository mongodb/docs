# start sample app
from pymongo import MongoClient

try:
    # start authentication code here

    # end authentication code here

    client.admin.command("ping")
    print("Authenticated successfully")

    # other application code

    client.close()

except Exception as e:
    raise Exception(
        "The following error occurred: ", e)
# end sample app
