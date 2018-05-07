import motor.motor_asyncio
import asyncio
import pprint

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin');

db = client.test

collection = db.inventory

# Start deleteOne (Example 57)
async def do_delete_many():
    document = await db.inventory.delete_many({"status": "A"})
    pprint.pprint(document.raw_result)
# End deleteOne example

loop = asyncio.get_event_loop()
loop.run_until_complete(do_delete_many())
client.close()
loop.close()

