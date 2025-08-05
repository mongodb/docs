The :dbcommand:`update` command can produce different change
events (not just :data:`update`) depending on the actual
changes it makes to the collection. 

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 70

   * - Change Event
     - Description

   * - :data:`update`
     - The update operation modified an existing document.

   * - :data:`replace`
     - The update operation replaced the document or produced a
       diff that was more verbose than the original document,
       causing MongoDB to replace it.

   * - :data:`insert`
     - The update operation attempted to update a document that
       doesn't exist and instead added the document to the
       collection. This only occurs when the update runs with
       the ``upsert`` option enabled.
