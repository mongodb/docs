For the following |onprem| release series, you may run its
:term:`backing databases` on any of the following MongoDB versions:

.. list-table:: Supported Versions of MongoDB for Backing Databases on Each Version of |onprem|
   :header-rows: 1
   :stub-columns: 1
   :widths: 25 15 15 15 15 15

   * - |onprem| Release Series
     - MongoDB 3.4
     - MongoDB 3.6
     - MongoDB 4.0
     - MongoDB 4.2
     - MongoDB 4.4

   * - |onprem| 4.0
     - :icon-fa5:`check`
     - :icon-fa5:`check-circle`
     - :icon-fa5:`check-circle`
     -
     -

   * - |onprem| 4.2
     -
     - :icon-fa5:`check`
     - :icon-fa5:`check-circle`
     - :icon-fa5:`check-circle`
     -

   * - |onprem| 4.4
     -
     -
     - :icon-fa5:`check`
     - :icon-fa5:`check-circle`
     - :icon-fa5:`check-circle`

The preceding table uses this convention:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :icon-fa5:`check-circle`
     - Version supported
   * - :icon-fa5:`check`
     - Version deprecated

Version support covers the full release series from the first to the
last release.

.. example::

   |onprem| 4.0 and 4.2 support the entire MongoDB release series from
   3.6.0 to 3.6.19.

To learn more about MongoDB versioning, see
:ref:`release-version-numbers` in the MongoDB Manual.

.. important::

   Only the MongoDB |onprem| :term:`backing databases` must meet this
   requirement. The MongoDB deployments that |onprem| manages do not.
   For the minimum versions required for managed MongoDB deployments,
   see :doc:`/reference/mongodb-compatibility/`.
