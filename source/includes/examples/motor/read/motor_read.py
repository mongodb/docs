import motor.motor_asyncio
import asyncio
import pprint

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin');
db = client.test

collection = db.inventory

async def do_find():
    cursor = db.inventory.find({})
    async for doc in cursor:
       pprint.pprint(doc)

loop = asyncio.get_event_loop()
loop.run_until_complete(do_find())
client.close()
loop.close()

