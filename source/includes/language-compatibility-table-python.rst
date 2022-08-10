Python 3 Compatibility
``````````````````````

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - PyMongo Driver Version
     - Python 3.10 [#ssl-4.0-issue]_
     - Python 3.9
     - Python 3.8
     - Python 3.7
     - Python 3.6
     - Python 3.5
     - Python 3.4
     - Python 3.3
     - PyPy3
     - Python 3.2
     - Python 3.1

   * - 4.2
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
     -

   * - 4.1
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓ [#three-six-compat]_
     -
     -
     -
     -
     -
     -

   * - 4.0
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

   * - 3.12
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     - ✓
     -
     -

   * - 3.11
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     - ✓
     -
     -

   * - 3.10
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     - ✓
     -
     -

   * - 3.9
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     -
     - ✓
     -
     -

   * - 3.8
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     -
     - ✓
     -
     -

   * - 3.7
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     -
     - ✓
     -
     -

   * - 3.6
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     -
     - ✓
     -
     -

   * - 3.5
     -
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

   * - 3.4
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -

   * - 3.3
     -
     -
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     -
     -

   * - 3.2
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
     -

   * - 3.1
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
     -

   * - 3.0
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
     -

   * - 2.9
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

   * - 2.8
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

   * - 2.7
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

Python 2 Compatibility
``````````````````````

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility


   * - PyMongo Driver Version
     - Python 2.7, PyPy
     - Python 2.6
     - Python 2.5, Jython 2.5
     - Python 2.4

   * - 4.1 [#python-2-compat]_
     -
     -
     -
     -

   * - 4.0 [#python-2-compat]_
     -
     -
     -
     -

   * - 3.12
     - ✓
     -
     -
     -

   * - 3.11
     - ✓
     -
     -
     -

   * - 3.10
     - ✓
     -
     -
     -

   * - 3.9
     - ✓
     -
     -
     -

   * - 3.8
     - ✓
     -
     -
     -

   * - 3.7
     - ✓
     - ✓
     -
     -


   * - 3.6
     - ✓
     - ✓
     -
     -

   * - 3.5
     - ✓
     - ✓
     -
     -

   * - 3.4
     - ✓
     - ✓
     -
     -

   * - 3.3
     - ✓
     - ✓
     -
     -

   * - 3.2
     - ✓
     - ✓
     -
     -

   * - 3.1
     - ✓
     - ✓
     -
     -

   * - 3.0
     - ✓
     - ✓
     -
     -

   * - 2.9
     - ✓
     - ✓
     - ✓
     - ✓

   * - 2.8
     - ✓
     - ✓
     - ✓
     - ✓

   * - 2.7
     - ✓
     - ✓
     - ✓
     - ✓

.. [#python-2-compat] Versions of PyMongo 4.0 and later are not compatible
   with Python 2
.. [#ssl-4.0-issue] Versions of Python 3.10 and later are not compatible with
   TLS/SSL for versions of MongoDB 4.0 and earlier. See the `PyMongo documentation <https://pymongo.readthedocs.io/en/stable/examples/tls.html#python-3-10-incompatibilities-with-tls-ssl-on-mongodb-4-0>`__
   for more information.
.. [#three-six-compat] Pymongo 4.1 requires Python 3.6.2 or later.

.. note::

   - Jython 2.5 is a Python 2.5-compatible alternative interpreter.
   - PyPy is a Python 2.7 and 3.2-compatible alternative interpreter.
