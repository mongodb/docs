Starting in MongoDB 6.3, 6.0.5, and 5.0.16, the ``wildcardProjection``
field stores the index projection in its submitted form. Earlier
versions of the server may have stored the projection in a normalized
form.

The server uses the index the same way, but you may notice a difference
in the output of the :dbcommand:`listIndexes` and
:method:`db.collection.getIndexes()` commands.
