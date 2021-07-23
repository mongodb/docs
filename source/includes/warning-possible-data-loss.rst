.. warning::

   There is a small chance of data loss when using (``$``) prefixed
   field names or field names with (``.``) characters when this type of
   field name is used in conjunction with unacknowledged writes
   (:doc:`write concern </reference/write-concern>` ``w=0``) on servers
   that are older than MongoDB 5.0.

   When running :doc:`insert </tutorial/insert-documents>`,
   :doc:`update </tutorial/insert-documents>`, and
   :doc:`findAndModify </reference/method/db.collection.findAndModify>`
   commands, drivers that are 5.0 compatible remove restrictions on
   using documents with field names that are (``$``) prefixed or that
   contain (``.``) characters. These field names generated a
   client-side error in earlier driver versions.

   The restrictions are removed regardless of the server version the
   driver is connected to. If a 5.0 driver sends a document to an older
   server, the document will be rejected without sending an error.

