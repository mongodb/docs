import tornado
import motor

async def ping_server():
    # Replace the placeholder with your Atlas connection string
    uri = "<connection string>"

    # Set a 5-second connection timeout when creating a new client
    client = motor.motor_tornado.MotorClient(uri, serverSelectionTimeoutMS=5000)

    # Send a ping to confirm a successful connection
    try:
      await client.admin.command('ping')
      print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
      print(e)

tornado.ioloop.IOLoop.current().run_sync(ping_server)