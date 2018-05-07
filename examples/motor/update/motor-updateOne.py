import motor.motor_asyncio
import asyncio
import pprint

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin');

db = client.test

collection = db.inventory

# Start updateOne (Example 52)
async def do_update_one():
    document = await db.inventory.update_one(
                   {"item": "paper"},
                   {"$set": {"size.uom": "cm", "status": "P"},
                    "$currentDate": {"lastModified": True}})
    pprint.pprint(document.raw_result)
# End updateOne example

loop = asyncio.get_event_loop()
loop.run_until_complete(do_update_one())
client.close()
loop.close()

