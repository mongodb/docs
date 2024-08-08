# start create bucket
client = MongoClient("<connection string>")
db = client["db"]
bucket = gridfs.GridFSBucket(db)
# end create bucket

# start create custom bucket
custom_bucket = gridfs.GridFSBucket(db, bucket_name="myCustomBucket")
# end create custom bucket

# start upload files
with bucket.open_upload_stream(
    "my_file", chunk_size_bytes=1048576, metadata={"contentType": "text/plain"}
) as grid_in:
    grid_in.write("data to store")
# end upload files

# start retrieve file info
for file_doc in bucket.find({}):
    print(file_doc)
# end retrieve file info

# start download files name
file = bucket.open_download_stream_by_name("my_file")
contents = file.read()
# end download files name

# start download files id
file = bucket.open_download_stream(ObjectId("66b3c86e672a17b6c8a4a4a9"))
contents = file.read()
# end download files id

# start rename files
bucket.rename(ObjectId("66b3c86e672a17b6c8a4a4a9"), "new_file_name")
# end rename files

# start delete files
bucket.delete(ObjectId("66b3c86e672a17b6c8a4a4a9"))
# end delete files
