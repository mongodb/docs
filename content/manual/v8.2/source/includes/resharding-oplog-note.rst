.. note::

    |operation| is a write-intensive process which can generate increased rates 
    of oplog. You may wish to:

    - set a fixed oplog size to prevent unbounded oplog growth.
    - increase the oplog size to minimize the chance that one or more
      secondary nodes becomes stale.
    
    See the :ref:`replica-set-oplog` documentation for more details.
