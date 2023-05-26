.. include:: /includes/index-build-introduction.rst

The following table compares the index build behavior starting in
MongoDB 7.1 with earlier versions.

.. list-table::
  :header-rows: 1
  :widths: 50 50

  * - Behavior Starting in MongoDB 7.1
    - Behavior in Earlier MongoDB Versions

  * - Index errors found during the collection scan phase, except
      duplicate key errors, are returned immediately and then the index
      build stops. Earlier MongoDB versions return errors in the commit
      phase, which occurs near the end of the index build. MongoDB 7.1
      helps you to rapidly diagnose index errors. For example, if an
      incompatible index value format is found, the error is returned to
      you immediately.
    - Index build errors can take a long time to be returned compared to
      MongoDB 7.1 because the errors are returned near the end of the
      index build in the commit phase.

  * - Increased resilience for your deployment. If an index build error
      occurs, a :term:`secondary` member can request that the
      :term:`primary` member stop an index build and the secondary
      member does not crash. A request to stop an index build is not
      always possible: if a member has already voted to commit the
      index, then the secondary cannot request that the index build stop
      and the secondary crashes (similar to MongoDB 7.0 and earlier).
    - An index build error can cause a secondary member to crash.

  * - Improved disk space management for index builds. An index build
      may be automatically stopped if the available disk space is below
      the minimum specified in the
      :parameter:`indexBuildMinAvailableDiskSpaceMB` parameter. If a
      member has already voted to commit the index, then the index build
      is not stopped.
    - An index build is not stopped if there is insufficient available
      disk space.
