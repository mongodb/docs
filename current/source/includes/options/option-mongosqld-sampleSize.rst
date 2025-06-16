.. option:: --sampleSize <number>

   *Default*: 1000

   .. versionadded:: 2.3
   
   The number of documents per namespace to sample when gathering schema
   information.
   
   Set :option:`--sampleSize` to ``0`` to include all
   documents in the specified namespace when building the schema. If
   you do not specify a namespace, setting :option:`--sampleSize` to
   ``0`` causes :binary:`~bin.mongosqld` to consider all documents in all
   databases (excluding ``local``, ``admin``, and ``system``) when
   building the schema. See an :ref:`example <sample-size-0>` below.
   

