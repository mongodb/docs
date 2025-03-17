# start-tailable-cursor
oplog = client.local.oplog.rs
first = oplog.find().sort('$natural', pymongo.ASCENDING).limit(-1).next()
print(first)
ts = first['ts']

while True:
    cursor = oplog.find({'ts': {'$gt': ts}},
                        cursor_type=pymongo.CursorType.TAILABLE_AWAIT)
    while cursor.alive:
        for doc in cursor:
            ts = doc['ts']
            print(doc)

        # You end up here if the find() method returns no documents, or if
        # no new documents are added to the collection for more than 1 second.
        time.sleep(1)
# end-tailable-cursor

# start-tailable-cursor-async
oplog = client.local.oplog.rs
first = await oplog.find().sort('$natural', pymongo.ASCENDING).limit(-1).next()
print(first)
ts = first['ts']

while True:
    cursor = oplog.find({'ts': {'$gt': ts}},
                        cursor_type=pymongo.CursorType.TAILABLE_AWAIT)
    while cursor.alive:
        async for doc in cursor:
            ts = doc['ts']
            print(doc)

        # You end up here if the find() method returns no documents, or if
        # no new documents are added to the collection for more than 1 second.
        await asyncio.sleep(1)
# end-tailable-cursor-async