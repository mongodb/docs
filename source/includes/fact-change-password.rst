In previous versions of MongoDB, you could change an existing user's
password by calling :method:`db.addUser()` again with the user's
username and their updated password. Anything specified in the
:method:`~addUser()` method would override the existing information for
that user. In newer versions of MongoDB, this will result in a duplicate
key error.
