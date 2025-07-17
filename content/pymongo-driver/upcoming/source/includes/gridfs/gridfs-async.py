# start create bucket
client = AsyncMongoClient("<connection string>")
db = client["db"]
bucket = gridfs.AsyncGridFSBucket(db)
# end create bucket

# start create custom bucket
custom_bucket = gridfs.AsyncGridFSBucket(db, bucket_name="myCustomBucket")
# end create custom bucket

# start upload files
async with bucket.open_upload_stream(
    "my_file", chunk_size_bytes=1048576, metadata={"contentType": "text/plain"}
) as grid_in:
    await grid_in.write("data to store")
# end upload files

# start retrieve file info
async for file_doc in bucket.find({}):
    print(file_doc)
# end retrieve file info

# start download files name
file = await bucket.open_download_stream_by_name("my_file")
contents = await file.read()
# end download files name

# start download files id
file = await bucket.open_download_stream(ObjectId("66b3c86e672a17b6c8a4a4a9"))
contents = await file.read()
# end download files id

# start rename files
await bucket.rename(ObjectId("66b3c86e672a17b6c8a4a4a9"), "new_file_name")
# end rename files

# start delete files
await bucket.delete(ObjectId("66b3c86e672a17b6c8a4a4a9"))
# end delete files
