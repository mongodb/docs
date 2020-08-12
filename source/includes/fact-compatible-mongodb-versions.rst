For the following |onprem| release series, you may run its
:term:`backing databases` on any of the following MongoDB versions:

.. list-table:: Minimum Supported Versions of MongoDB for Backing Databases on Each Version of |onprem|
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
     - *3.4.0*
     - 3.6.0
     - 4.0.0
     -
     -

   * - |onprem| 4.2
     -
     - *3.6.0*
     - 4.0.0
     - 4.2.0
     -

   * - |onprem| 4.4
     -
     -
     - 4.0.0
     - 4.2.0
     - 4.4.0

The version listed spans the full release series starting from the
listed version.

.. example::

   If the listed MongoDB 3.6 version was ``3.6.6``, |onprem| can run
   any MongoDB version from 3.6.6 to 3.6.19, inclusive, as a backing
   database.

MongoDB versions in *italics* are deprecated.

To learn more about MongoDB versioning, see
:ref:`release-version-numbers` in the MongoDB Manual.

.. important::

   Only the MongoDB |onprem| :term:`backing databases` must meet this
   requirement. The MongoDB deployments that |onprem| manages do not.
   For the minimum versions required for managed MongoDB deployments,
   see :doc:`/reference/mongodb-compatibility/`.
