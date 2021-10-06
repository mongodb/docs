Starting in MongoDB 5.1 (and 5.0.4), the :pipeline:`$setWindowFields` 
stage cannot be used within :doc:`transactions </core/transactions>`
or with :readconcern:`"snapshot"` read concern.