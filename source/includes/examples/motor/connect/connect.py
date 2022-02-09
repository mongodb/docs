#Start Connect
import motor.motor_asyncio
import asyncio
import pprint

client = motor.motor_asyncio.AsyncIOMotorClient('<URISTRING>')
#End Connect
db = client.test
#Start Close
client.close()
#End Close
