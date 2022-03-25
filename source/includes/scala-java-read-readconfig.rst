``MongoSpark.load()`` can accept a ``ReadConfig`` object which
specifies various :ref:`read configuration settings
<spark-output-conf>`, such as the collection or the
:ref:`Read Preference
<replica-set-read-preference-modes>`.

The following example reads from the ``spark`` collection with a
``secondaryPreferred`` read preference:
