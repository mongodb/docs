When you use a |$project| stage it should typically be the last stage in
your pipeline, used to specify which fields to return to the client.

Using a ``$project`` stage at the beginning or middle of a pipeline to
reduce the number of fields passed to subsequent pipeline stages is
unlikely to improve performance, as the database performs this
optimization automatically.
