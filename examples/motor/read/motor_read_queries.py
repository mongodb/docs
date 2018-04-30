import motor.motor_asyncio
import asyncio
import pprint
from bson.son import SON

#client = motor.motor_asyncio.AsyncIOMotorClient('<URISTRING>')
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin');
db = client.test

collection = db.inventory

async def do_retrieve_status():
    cursor = db.inventory.find({"status": "D"})
    async for doc in cursor:
        pprint.pprint(doc)

async def do_retrieve_embedded():
    cursor = db.inventory.find(
    {"size": SON([("h", 14), ("w", 21), ("uom", "cm")])})
    async for doc in cursor:
        pprint.pprint(doc)

async def do_retrieve_embedded_dot():
    cursor = db.inventory.find({"size.uom": "in"})
    async for doc in cursor:
        pprint.pprint(doc)

async def do_insert_many():
    # Subdocument key order matters in a few of these examples so we have
    # to use bson.son.SON instead of a Python dict.
    from bson.son import SON
    await db.inventory.insert_many([
        {"item": "journal",
         "qty": 25,
         "size": SON([("h", 14), ("w", 21), ("uom", "cm")]),
         "status": "A"},
        {"item": "notebook",
         "qty": 50,
         "size": SON([("h", 8.5), ("w", 11), ("uom", "in")]),
         "status": "A"},
        {"item": "paper",
         "qty": 100,
         "size": SON([("h", 8.5), ("w", 11), ("uom", "in")]),
         "status": "D"},
        {"item": "planner",
         "qty": 75,
         "size": SON([("h", 22.85), ("w", 30), ("uom", "cm")]),
         "status": "D"},
        {"item": "postcard",
         "qty": 45,
         "size": SON([("h", 10), ("w", 15.25), ("uom", "cm")]),
         "status": "A"}])

loop = asyncio.get_event_loop()
#loop.run_until_complete(do_insert_many())
loop.run_until_complete(do_retrieve_status())
loop.run_until_complete(do_retrieve_embedded())
loop.run_until_complete(do_retrieve_embedded_dot())
client.close()
loop.close()

