import os  

from contextlib import asynccontextmanager 
from logging import info

from fastapi import FastAPI
from pymongo import AsyncMongoClient

@asynccontextmanager
async def db_lifespan(app: FastAPI):
    # Startup
    app.mongodb_client = AsyncMongoClient(os.environ["MONGODB_URL"])
    app.database = app.mongodb_client.get_default_database()
    ping_response = await app.database.command("ping")
    if int(ping_response["ok"]) != 1:
        raise Exception("Problem connecting to database cluster.")
    else:
        info("Connected to database cluster.")
    yield
    # Shutdown
    await app.mongodb_client.close()

app: FastAPI = FastAPI(lifespan=db_lifespan)