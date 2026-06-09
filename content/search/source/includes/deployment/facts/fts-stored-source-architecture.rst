You can define :ref:`stored source <fts-stored-source-definition>`
fields in your |fts| index so that the ``mongot`` process can store the
specified fields on ``mongot``. You can then use the
:ref:`returnStoredSource Option <fts-return-stored-source-option>` in
your |fts| query to retrieve the stored fields for matching documents
directly from ``mongot`` instead of doing a full document lookup on the
database.
