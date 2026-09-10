.. note::
   The following web application uses `FastAPI 
   <https://github.com/tiangolo/fastapi>`__. To create a new application,
   use the `FastAPI sample file 
   <https://github.com/tiangolo/fastapi#example>`__ structure.

.. code-block:: python
   :linenos:

   # File: main.py

   from fastapi import FastAPI, Body, Request, Response, HTTPException, status
   from fastapi.encoders import jsonable_encoder

   from typing import List
   from models import User

   import pymongo
   from pymongo import MongoClient
   from pymongo import errors

   # Replace the uri string with your |service| connection string
   uri = "<atlas-connection-string>"
   db = "test"

   app = FastAPI()

   @app.on_event("startup")
   def startup_db_client():
       app.mongodb_client = MongoClient(uri)
       app.database = app.mongodb_client[db]

   @app.on_event("shutdown")
   def shutdown_db_client():
       app.mongodb_client.close()

   ##### API ROUTES #####
   @app.get("/users", response_description="List all users", response_model=List[User])
   def list_users(request: Request):
       try: 
           users = list(request.app.database["users"].find().max_time_ms(5000))
           return users
       except pymongo.errors.ExecutionTimeout: 
           raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="The request has timed out. Please check your connection and try again.")

   @app.post("/users", response_description="Create a new user", status_code=status.HTTP_201_CREATED)
   def new_user(request: Request, user: User = Body(...)):
       user = jsonable_encoder(user)
       try: 
           new_user = request.app.database["users"].insert_one(user)
           return {"message":"User successfully added!"}
       except pymongo.errors.DuplicateKeyError:
           raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not create user due to existing '_id' value in the collection. Try again with a different '_id' value.")
