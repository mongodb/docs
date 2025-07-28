require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  database = client.use('sample_restaurants')
  collection = database[:restaurants]

  # start-create-bucket
  bucket = database.fs
  # end-create-bucket

  # start-create-custom-bucket
  custom_bucket = database.fs(database, bucket_name: 'files')
  # end-create-custom-bucket

  # start-upload-files
  metadata = { uploaded_by: 'username' }
  File.open('/path/to/file', 'rb') do |file|
    file_id = bucket.upload_from_stream('test.txt', file, metadata: metadata)
    puts "Uploaded file with ID: #{file_id}"
  end
  # end-upload-files

  # start-retrieve-file-info
  bucket.find.each do |file|
    puts "Filename: #{file.filename}"
  end
  # end-retrieve-file-info

  # start-download-files-id
  file_id = BSON::ObjectId('your_file_id')
  File.open('/path/to/downloaded_file', 'wb') do |file|
    bucket.download_to_stream(file_id, file)
  end
  # end-download-files-id

  # start-download-files-name
  File.open('/path/to/downloaded_file', 'wb') do |file|
    bucket.download_to_stream_by_name('mongodb-tutorial', file)
  end
  # end-download-files-name

  # start-delete-files
  file_id = BSON::ObjectId('your_file_id')
  bucket.delete(file_id)
  # end-delete-files
end