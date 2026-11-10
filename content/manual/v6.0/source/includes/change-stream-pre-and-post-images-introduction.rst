Starting in MongoDB 6.0, you can use :ref:`change stream events
<change-stream-output>` to output the version of a document before and
after changes (the document pre- and post-images):

- The pre-image is the document before it was replaced, updated, or
  deleted. There is no pre-image for an inserted document.

- The post-image is the document after it was inserted, replaced, or
  updated. There is no post-image for a deleted document.

- Enable ``changeStreamPreAndPostImages`` for a collection using
  :method:`db.createCollection()`, :dbcommand:`create`, or
  :dbcommand:`collMod`.
