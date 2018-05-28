For the following |onprem| release series, you may run its 
:term:`backing databases` on any of the following MongoDB revisions.

.. list-table::
   :header-rows: 1
   :widths: 16 16 16 16 16 16

   * - |onprem| Release Series
     - Minimum MongoDB 2.6 Revision
     - Minimum MongoDB 3.0 Revision
     - Minimum MongoDB 3.2 Revision
     - Minimum MongoDB 3.4 Revision
     - Minimum MongoDB 3.6 Revision

   * - 2.0
     - 2.6.6
     - 3.0.6
     - 3.2.0
     - 3.4.0
     - 3.6.0

   * - 3.4
     - 
     - 3.0.8
     - 3.2.0
     - 3.4.0
     - 3.6.0

   * - 3.6
     - 
     - 
     - 3.2.0
     - 3.4.0
     - 3.6.0

For more information on MongoDB versioning, see 
:ref:`release-version-numbers` in the MongoDB Manual.

.. important::

   Only the MongoDB |onprem| :term:`backing databases` must meet this
   requirement. The MongoDB deployments that |onprem| manages do not.
   For the minimum versions required for managed MongoDB deployments,
   see :doc:`/reference/mongodb-compatibility/`.
