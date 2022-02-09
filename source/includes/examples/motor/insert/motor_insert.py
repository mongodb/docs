import motor.motor_asyncio
import asyncio
import pprint

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin');
db = client.test

collection = db.inventory

async def do_insert_one():
    document = await db.inventory.insert_one(
     {"item": "canvas",
     "qty": 100,
     "tags": ["cotton"],
     "size": {"h": 28, "w": 35.5, "uom": "cm"}})
    pprint.pprint(document)

loop = asyncio.get_event_loop()
loop.run_until_complete(do_insert_one())
client.close()
loop.close()

