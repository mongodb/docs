.. |nbspc| unicode:: U+00A0 
.. Above is a hack for indenting the table contents, since other
.. strategies failed.

.. list-table::
   :class: borderless
   :widths: 25 75

   * - :guilabel:`Binary Import / Export` 
     -

   * - |nbspc| |nbspc| :binary:`~bin.mongodump`
     - Creates a binary export of the contents of a 
       :binary:`~bin.mongod` database.
        
   * - |nbspc| |nbspc| :binary:`~bin.mongorestore`
     - Restores data from a :binary:`~bin.mongodump` database dump 
       into a :binary:`~bin.mongod` or :binary:`~bin.mongos`.

   * - |nbspc| |nbspc| :binary:`~bin.bsondump`
     - Converts :term:`BSON` dump files into :term:`JSON`.

   * - :guilabel:`Data Import / Export`
     - 
     
   * - |nbspc| |nbspc| :binary:`~bin.mongoimport`
     - Imports content from an
       :manual:`Extended JSON </reference/mongodb-extended-json>`,
       CSV, or TSV export file.

   * - |nbspc| |nbspc| :binary:`~bin.mongoexport`
     - Produces a :term:`JSON` or :term:`CSV` export of data stored in
       a :binary:`~bin.mongod` instance.

   * - :guilabel:`Diagnostic Tools`
     -

   * - |nbspc| |nbspc| :binary:`~bin.mongostat`
     - Provides a quick overview of the status of a currently running
       :binary:`~bin.mongod` or :binary:`~bin.mongos` instance.
    
   * - |nbspc| |nbspc| :binary:`~bin.mongotop`
     - Provides an overview of the time a :binary:`~bin.mongod` instance
       spends reading and writing data.

   * - :guilabel:`GridFS Tools`
     -

   * - |nbspc| |nbspc| :binary:`~bin.mongofiles`
     - Supports manipulating files stored in your MongoDB instance in
       :term:`GridFS` objects.
