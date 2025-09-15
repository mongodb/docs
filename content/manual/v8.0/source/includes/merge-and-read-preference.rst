Consider the following points when using :pipeline:`$merge` or
:pipeline:`$out` stages in an :ref:`aggregation pipeline
<aggregation-pipeline>`:

- Starting in MongoDB 5.0, pipelines with a ``$merge`` stage can run on
  replica set :term:`secondary` nodes if all the nodes in the cluster
  have the :ref:`featureCompatibilityVersion <view-fcv>` set to ``5.0``
  or higher and the :ref:`read preference <read-preference>`
  allows secondary reads.

  - ``$merge`` and ``$out`` stages run on secondary nodes, but write
    operations are sent to the :term:`primary` node.

  - Not all driver versions support ``$merge`` operations sent to
    the secondary nodes. For details, see the :driver:`driver </>`
    documentation.

- In earlier MongoDB versions, pipelines with ``$out`` or ``$merge``
  stages always run on the primary node and read preference isn't
  considered.
