Python 3
~~~~~~~~

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - {+driver-short+} Version
     - CPython 3.13
     - CPython 3.12
     - CPython 3.11
     - CPython 3.10 [#ssl-4.0-issue]_
     - CPython 3.9
     - CPython 3.8
     - CPython 3.7
     - CPython 3.6
     - CPython 3.5
     - CPython 3.4
     - PyPy3

   * - 4.11
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - 
     -
     -
     -
     -
     -

   * - 4.9 to 4.10
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     -
     -
     -
     -
     -

   * - 4.8
     -
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     - ✓ 
     -
     -
     -
     -
     -

   * - 4.5 to 4.7
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -
     -

   * - 4.3 to 4.4
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -
     -

   * - 4.2
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -
     -

   * - 4.1 [#three-six-compat]_
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -

   * - 4.0
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -
     -

   * - 3.13
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.12
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.11
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.10
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.7 to 3.9
     -
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

.. [#ssl-4.0-issue] Versions of Python 3.10 and later are not compatible with
   TLS/SSL for versions of MongoDB 4.0 and earlier. For more information, see the
   :ref:`TLS <pymongo-troubleshoot-tls>` section of the Troubleshooting guide.
.. [#three-six-compat] Pymongo 4.1 requires Python 3.6.2 or later.

Python 2
~~~~~~~~

{+driver-short+} versions 3.7 through 3.12 are compatible with Python 2.7 and PyPy, a Python 2.7-
compatible alternative interpreter.
