import motor.motor_asyncio
import asyncio
import pprint

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin');
db = client.test

collection = db.inventory

async def do_retrieve_operator():
    cursor = db.inventory.find({"size.h": {"$lt": 15}})
    async for doc in cursor:
       pprint.pprint(doc)


async def do_retrieve_implied_and():
    cursor = db.inventory.find({"status": "A", "qty": {"$lt": 30}})
    async for doc in cursor:
        pprint.pprint(doc)

async def do_retrieve_or():
    cursor = db.inventory.find({"$or": [{"status": "A"}, {"qty": {"$lt": 30}}]})
    async for doc in cursor:
        pprint.pprint(doc)

async def do_retrieve_regex():
    cursor = db.inventory.find({
                               "status": "A",
                               "$or": [{"qty": {"$lt": 30}}, {"item": {"$regex": "^p"}}]})
    async for doc in cursor:
        pprint.pprint(doc)

loop = asyncio.get_event_loop()
loop.run_until_complete(do_retrieve_operator())
loop.run_until_complete(do_retrieve_implied_and())
loop.run_until_complete(do_retrieve_or())
loop.run_until_complete(do_retrieve_regex())
client.close()
loop.close()

