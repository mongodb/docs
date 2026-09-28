.. warning::

   For situations involving rapid deletions or traffic spikes, configuring
   ``fullDocument: "updateLookup"`` with a :pipeline:`$match` filter can cause
   'Resume Token Not Found' errors. This occurs when a document deletion causes
   the ``fullDocument`` field to return a null value, because there is no
   matching document, which then prevents the change stream from finding 
   the resume token.
   
   Instead, use Pre- and Post-Images with ``fullDocumentBeforeChange:
   "whenAvailable"`` and ``fullDocument: "whenAvailable"``. See the :ref:`Change Streams with Document Pre- and Post-Images
   <db.collection.watch-change-streams-pre-and-post-images-example>` section.