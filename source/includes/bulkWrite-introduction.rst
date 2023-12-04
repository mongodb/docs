Starting in MongoDB 7.2, you can use the new :dbcommand:`bulkWrite`
command to perform many insert, update, and delete operations on
multiple collections in one request. The existing
:method:`db.collection.bulkWrite` method only allows you to modify one
collection in one request.
