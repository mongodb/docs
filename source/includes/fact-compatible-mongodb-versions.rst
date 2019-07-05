For the following |onprem| release series, you may run its
:term:`backing databases` on any of the following MongoDB versions:

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 10 10 10 10 10

   * - |onprem| Release Series
     - Minimum MongoDB 2.6 version
     - Minimum MongoDB 3.0 version
     - Minimum MongoDB 3.2 version
     - Minimum MongoDB 3.4 version
     - Minimum MongoDB 3.6 version
     - Minimum MongoDB 4.0 version
     - Minimum MongoDB 4.2 version

   * - 2.0
     - 2.6.6
     - 3.0.6
     - 3.2.0
     -
     -
     -
     -

   * - 3.4
     -
     - 3.0.8
     - 3.2.0
     - 3.4.0
     -
     -
     -

   * - 3.6
     -
     -
     - *3.2.0*
     - 3.4.0
     - 3.6.0
     -
     -

   * - 4.0
     -
     -
     -
     - *3.4.0*
     - 3.6.0
     - 4.0.0
     -

   * - 4.1
     -
     -
     -
     - *3.4.0*
     - 3.6.0
     - 4.0.0
     -

   * - 4.2
     -
     -
     -
     -
     - *3.6.0*
     - 4.0.0
     - 4.2.0


Each version listed spans the full release series starting from the
listed version (i.e., a minimum MongoDB 2.6 version of 2.6.6 implies
compatibility with MongoDB versions 2.6.6 to 2.6.12).

MongoDB versions in *italics* are deprecated.

To learn more about MongoDB versioning, see
:ref:`release-version-numbers` in the MongoDB Manual.

.. important::

   Only the MongoDB |onprem| :term:`backing databases` must meet this
   requirement. The MongoDB deployments that |onprem| manages do not.
   For the minimum versions required for managed MongoDB deployments,
   see :doc:`/reference/mongodb-compatibility/`.
