.. note::

   TTL collections expire data by remove documents in a background
   task that runs once a minute. As a result, documents may remain in
   a collection for up to 60 second *after* they expire, before the
   background process removes them.
