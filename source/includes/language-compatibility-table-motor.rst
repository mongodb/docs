
.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Motor (Python async) Driver
     - Python 2.5
     - Python 2.6
     - Python 2.7
     - Python 3.3
     - Python 3.4
     - Python 3.5
     - Python 3.6
     
   * - 1.2
     -
     -
     - |checkmark|
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 1.1
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 1.0
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|

   * - 0.7
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     -

   * - 0.6
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     -

   * - 0.5
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     -

   * - 0.4
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     -
     -

   * - 0.3
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     -
     -

   * - 0.2
     -
     - |checkmark|
     - |checkmark|
     - |checkmark|
     -
     -
     -

   * - 0.1
     - |checkmark|
     - |checkmark|
     - |checkmark|
     - |checkmark|
     -
     -
     -

- Motor 1.1 wraps PyMongo 3.4+
- Motor 1.0 wraps PyMongo 3.3+
- Motor 0.7 wraps PyMongo >=2.9.4 and <3.0
- Motor 0.6 wraps PyMongo 2.8
- Motor 0.5 wraps PyMongo 2.8
- Motor 0.4 wraps PyMongo 2.8
- Motor 0.3 wraps PyMongo 2.7.1
- Motor 0.2 wraps PyMongo 2.7.0
- Motor 0.1 wraps PyMongo 2.5.0

.. note::

   - Motor version 0.5 and earlier requires Tornado, and supports the
     same version of Python as its supported Tornado versions do.

   - For asyncio support, Motor requires Python 3.4+, or
     Python 3.3 with the `asyncio package from PyPI
     <https://pypi.python.org/pypi/asyncio>`_.

   - PyPy is not supported as it runs Motor code slowly.

   - Motor does not support Jython or Windows.
