Starting in MongoDB 8.0, you can use the new :dbcommand:`bulkWrite`
command to perform many insert, update, and delete operations on
multiple collections in one request. The existing
:method:`db.collection.bulkWrite` method only allows you to modify one
collection in one request.
