.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - PyMongo Version
     - PyPy3.10
     - PyPy3.9
     - PyPy3.8
     - PyPy3.7
     - PyPy3.6
     - PyPy3.5

   * - 4.11 to 4.14
     - ✓ 
     -
     -
     -
     -
     -

   * - 4.8 to 4.10
     - ✓ 
     - ✓ 
     -
     -
     -
     -

   * - 4.5 to 4.7
     - ✓ 
     - ✓ 
     - ✓ 
     -
     -
     -

   * - 4.2 to 4.4
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -

   * - 4.1 [#three-six-compat]_
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - 4.0
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -

   * - 3.12
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.11
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.10
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.7 to 3.9
     -
     -
     -
     - ✓
     - ✓
     - ✓

.. [#ssl-4.0-issue] Versions of Python 3.10 and later are not compatible with
   TLS/SSL for versions of MongoDB 4.0 and earlier. For more information, see the
   `Troubleshooting <https://www.mongodb.com/docs/languages/python/pymongo-driver/current/security/tls/#troubleshooting>`__
   section of the TLS page.
.. [#three-six-compat] PyMongo 4.1 requires Python 3.6.2 or later.