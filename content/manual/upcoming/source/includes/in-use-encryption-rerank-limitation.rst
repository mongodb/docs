.. note::

   The ``$rerank`` stage isn't supported with clients configured for
   automatic encryption using |encryption|. A pipeline that contains
   ``$rerank`` fails with an error such as ``Unrecognized pipeline
   stage name: '$rerank'``.

   The limitation applies to all collections, including collections
   that have no encrypted fields, and to the use of ``$rerank``
   inside sub-pipelines such as :pipeline:`$unionWith`.
