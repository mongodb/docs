The ``storedSource`` option allows you to store copies of fields inside 
the {+avs+} index in addition to the database. This improves query 
performance in certain :ref:`use cases <avs-return-stored-source-use-case>`
as it reduces the need for implicit query time lookup on the backend 
database.

{+avs+} doesn't index stored fields. Therefore, you must index the fields
separately in order to :ref:`filter <vectorSearch-agg-pipeline-filter>`
on them. You can retrieve stored fields at query-time by using the
:ref:`returnStoredSource <avs-return-stored-source>` option.  

To learn more about retrieving the stored fields, see 
:ref:`returnStoredSource <avs-return-stored-source>`.