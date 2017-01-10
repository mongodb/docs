``MongoSpark.save()`` can accept a ``WriteConfig`` object which
specifies various :ref:`write configuration settings
<spark-output-conf>`, such as the collection or the write concern.

For example, the following code saves data to the ``spark`` collection
with a ``majority`` :ref:`write concern <write-concern>`: