Starting in MongoDB 6.0, if you are using document pre- and post-images
for :ref:`change streams <change-stream-output>`, you must disable
:ref:`changeStreamPreAndPostImages
<collMod-change-stream-pre-and-post-images>` for each collection using
the :dbcommand:`collMod` command before you can downgrade to an earlier
MongoDB version.
