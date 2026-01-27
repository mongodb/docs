using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Fundamentals;

class GridFS
{
    static void CreateBucket()
    {
        // Initialize MongoDB client
        // start-create-bucket
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);
        // end-create-bucket
    }

    static void CreateCustomBucket()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates or references a GridFS bucket with a custom name
        // start-create-custom-bucket
        var options = new GridFSBucketOptions { BucketName = "myCustomBucket" };
        var customBucket = new GridFSBucket(database, options);
        // end-create-custom-bucket
    }

    static async Task UploadFileAsync()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Uploads a file called "my_file" to the GridFS bucket and writes data to it
        // start-open-upload-stream-async
        using (var uploader = await bucket.OpenUploadStreamAsync("my_file", options))
        {
            // ASCII for "HelloWorld"
            byte[] bytes = { 72, 101, 108, 108, 111, 87, 111, 114, 108, 100 };

            await uploader.WriteAsync(bytes, 0, bytes.Length);
            await uploader.CloseAsync();
        }
        // end-open-upload-stream-async
    }

    static void UploadFile()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Uploads a file called "my_file" to the GridFS bucket and writes data to it
        // start-open-upload-stream
        using (var uploader = bucket.OpenUploadStream("my_file"))
        {
            // ASCII for "HelloWorld"
            byte[] bytes = { 72, 101, 108, 108, 111, 87, 111, 114, 108, 100 };

            uploader.Write(bytes, 0, bytes.Length);
            uploader.Close();
        }
        // end-open-upload-stream
    }

    static async Task UploadFileWithOptionsAsync()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Uploads a file called "my_file" to the GridFS bucket and writes data to it
        // start-open-upload-stream-with-options-async
        var options = new GridFSUploadOptions
        {
            ChunkSizeBytes = 1048576 // 1 MB
        };

        using (var uploader = await bucket.OpenUploadStreamAsync("my_file", options))
        {
            // ASCII for "HelloWorld"
            byte[] bytes = { 72, 101, 108, 108, 111, 87, 111, 114, 108, 100 };

            await uploader.WriteAsync(bytes, 0, bytes.Length);
            await uploader.CloseAsync();
        }
        // end-open-upload-stream-with-options-async
    }

    static void UploadFileWithOptions()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Uploads a file called "my_file" to the GridFS bucket and writes data to it
        // start-open-upload-stream-with-options
        var options = new GridFSUploadOptions
        {
            ChunkSizeBytes = 1048576 // 1 MB
        };

        using (var uploader = bucket.OpenUploadStream("my_file", options))
        {
            // ASCII for "HelloWorld"
            byte[] bytes = { 72, 101, 108, 108, 111, 87, 111, 114, 108, 100 };

            uploader.Write(bytes, 0, bytes.Length);
            uploader.Close();
        }
        // end-open-upload-stream-with-options
    }

    static async Task UploadStreamAsync()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Uploads data to a stream, then writes the stream to a GridFS file
        // start-upload-from-stream-async
        using (var fileStream = new FileStream("/path/to/input_file", FileMode.Open, FileAccess.Read))
        {
            await bucket.UploadFromStreamAsync("new_file", fileStream);
        }
        // end-upload-from-stream-async
    }

    static void UploadStream()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Uploads data to a stream, then writes the stream to a GridFS file
        // start-upload-from-stream
        using (var fileStream = new FileStream("/path/to/input_file", FileMode.Open, FileAccess.Read))
        {
            bucket.UploadFromStream("new_file", fileStream);
        }
        // end-upload-from-stream
    }

    static void Find()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Prints information about each file in the bucket
        // start-find
        var filter = Builders<GridFSFileInfo>.Filter.Empty;

        var files = bucket.Find(filter);

        foreach (var file in files.ToEnumerable())
        {
            Console.WriteLine(file.ToJson());
        }
        // end-find
    }

    static async Task FindAsync()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Prints information about each file in the bucket
        // start-find-async
        var filter = Builders<GridFSFileInfo>.Filter.Empty;
        var files = await bucket.FindAsync(filter);
        await files.ForEachAsync(file => Console.Out.WriteLineAsync(file.ToJson()))
        // end-find-async
    }

    static async Task DownloadFileAsync()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Downloads a file from the GridFS bucket by referencing its ObjectId value
        // start-open-download-stream-async
        var filter = Builders<GridFSFileInfo>.Filter.Eq(x => x.Filename, "new_file");
        var cursor = await bucket.FindAsync(filter);
        var fileInfoList = await cursor.ToListAsync();
        var doc = fileInfoList.FirstOrDefault();

        if (doc != null)
        {
            using (var downloader = await bucket.OpenDownloadStreamAsync(doc.Id))
            {
                var buffer = new byte[downloader.Length];
                await downloader.ReadAsync(buffer, 0, buffer.Length);

                // Process the buffer as needed
            }
        }
        // end-open-download-stream-async
    }

    static void DownloadFile()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Downloads a file from the GridFS bucket by referencing its ObjectId value
        // start-open-download-stream
        var filter = Builders<GridFSFileInfo>.Filter.Eq(x => x.Filename, "new_file");
        var doc = bucket.Find(filter).FirstOrDefault();

        if (doc != null)
        {
            using (var downloader = bucket.OpenDownloadStream(doc.Id))
            {
                var buffer = new byte[downloader.Length];
                downloader.Read(buffer, 0, buffer.Length);

                // Process the buffer as needed
            }
        }
        // end-open-download-stream
    }

    static async Task DownloadFileWithOptionsAsync()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Downloads a file from the GridFS bucket by referencing its ObjectId value
        // start-open-download-stream-with-options-async
        var filter = Builders<GridFSFileInfo>.Filter.Eq(x => x.Filename, "new_file");
        var cursor = await bucket.FindAsync(filter);
        var fileInfoList = await cursor.ToListAsync();
        var doc = fileInfoList.FirstOrDefault();

        if (doc != null)
        {
            var options = new GridFSDownloadOptions
            {
                Seekable = true
            };

            using (var downloader = await bucket.OpenDownloadStreamAsync(doc.Id, options))
            {
                var buffer = new byte[downloader.Length];
                await downloader.ReadAsync(buffer, 0, buffer.Length);

                // Process the buffer as needed
            }
        }
        // end-open-download-stream-with-options-async    
    }

    static void DownloadFileWithOptions()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Downloads a file from the GridFS bucket by referencing its ObjectId value
        // start-open-download-stream-with-options
        var filter = Builders<GridFSFileInfo>.Filter.Eq(x => x.Filename, "new_file");
        var doc = bucket.Find(filter).FirstOrDefault();

        if (doc != null)
        {
            var options = new GridFSDownloadOptions
            {
                Seekable = true
            };

            using (var downloader = bucket.OpenDownloadStream(id, options))
            {
                var buffer = new byte[downloader.Length];
                downloader.Read(buffer, 0, buffer.Length);

                // Process the buffer as needed
            }
        }
        // end-open-download-stream-with-options
    }

    static async Task DownloadStreamAsync()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Downloads an entire GridFS file to a download stream
        // start-download-to-stream-async
        var filter = Builders<GridFSFileInfo>.Filter.Eq(x => x.Filename, "new_file");
        var cursor = await bucket.FindAsync(filter);
        var fileInfoList = await cursor.ToListAsync();
        var doc = fileInfoList.FirstOrDefault();

        if (doc != null)
        {
            using (var outputFile = new FileStream("/path/to/output_file", FileMode.Create, FileAccess.Write))
            {
                await bucket.DownloadToStreamAsync(doc.Id, outputFile);
            }
        }
        // end-download-to-stream-async
    }

    static void DownloadStream()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Downloads an entire GridFS file to a download stream
        // start-download-to-stream
        var filter = Builders<GridFSFileInfo>.Filter.Eq(x => x.Filename, "new_file");
        var doc = bucket.Find(filter).FirstOrDefault();

        if (doc != null)
        {
            using (var outputFile = new FileStream("/path/to/output_file", FileMode.Create, FileAccess.Write))
            {
                bucket.DownloadToStream(doc.Id, outputFile);
            }
        }
        // end-download-to-stream
    }

    static async Task DeleteFileAsync()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Deletes a file from the GridFS bucket with the specified ObjectId
        // start-delete-file-async
        var filter = Builders<GridFSFileInfo>.Filter.Eq(x => x.Filename, "new_file");
        var cursor = await bucket.FindAsync(filter);
        var fileInfoList = await cursor.ToListAsync();
        var doc = fileInfoList.FirstOrDefault();

        if (doc != null)
        {
            await bucket.DeleteAsync(doc.Id);
        }
        // end-delete-file-async
    }

    static void DeleteFile()
    {
        // Initialize MongoDB client
        var client = new MongoClient("<connection string>");
        var database = client.GetDatabase("db");

        // Creates a GridFS bucket or references an existing one
        var bucket = new GridFSBucket(database);

        // Deletes a file from the GridFS bucket with the specified ObjectId
        // start-delete-file
        var filter = Builders<GridFSFileInfo>.Filter.Eq(x => x.Filename, "new_file");
        var doc = bucket.Find(filter).FirstOrDefault();

        if (doc != null)
        {
            bucket.Delete(doc.Id);
        }
        // end-delete-file
    }
}