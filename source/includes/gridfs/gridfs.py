# start create bucket
const db = client.db(dbName);
const bucket = new mongodb.GridFSBucket(db);
# end create bucket

# start create custom bucket
const bucket = new mongodb.GridFSBucket(db, { bucketName: 'myCustomBucket' });
# end create custom bucket

# start upload files
   fs.createReadStream('./myFile').
        pipe(bucket.openUploadStream('myFile', {
            chunkSizeBytes: 1048576,
            metadata: { field: 'myField', value: 'myValue' }
        }));
# end upload files

# start retrieve file info
   const cursor = bucket.find({});
   for await (const doc of cursor) {
      console.log(doc);
   }
# end retrieve file info

# start download files name
   bucket.openDownloadStreamByName('myFile').
        pipe(fs.createWriteStream('./outputFile'));
# end download files name

# start download files id
   bucket.openDownloadStream(ObjectId("60edece5e06275bf0463aaf3")).
        pipe(fs.createWriteStream('./outputFile'));
# end download files id

# start rename files
   bucket.rename(ObjectId("60edece5e06275bf0463aaf3"), "newFileName");
# end rename files

# start delete files
   bucket.delete(ObjectId("60edece5e06275bf0463aaf3"));
# end delete files