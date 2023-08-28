.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - PyMongo Driver Version
     - Python 3.12
     - Python 3.11
     - Python 3.10 [#ssl-4.0-issue]_
     - Python 3.9
     - Python 3.8
     - Python 3.7
     - Python 3.6

   * - 4.5
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - 4.4
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - 4.3
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - 4.2
     -
     - 
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - 4.1
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓ [#three-six-compat]_

   * - 4.0
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

.. [#ssl-4.0-issue] Versions of Python 4.10 and later are not compatible with
   TLS/SSL for versions of MongoDB 4.0 and earlier. See the `PyMongo documentation <https://pymongo.readthedocs.io/en/stable/examples/tls.html#python-3-10-incompatibilities-with-tls-ssl-on-mongodb-4-0>`__
   for more information.
.. [#three-six-compat] Pymongo 4.1 requires Python 3.6.2 or later.