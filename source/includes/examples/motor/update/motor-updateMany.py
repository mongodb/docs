import motor.motor_asyncio
import asyncio
import pprint

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin');

db = client.test

collection = db.inventory

# Start updateMany (Example 53)
async def do_update_many():
    document = await db.inventory.update_many(
                   {"qty": {"$lt": 50}},
                   {"$set": {"size.uom": "in", "status": "P"},
                    "$currentDate": {"lastModified": True}})
    pprint.pprint(document.raw_result)

# end updateMany example

loop = asyncio.get_event_loop()
loop.run_until_complete(do_update_many())
client.close()
loop.close()

