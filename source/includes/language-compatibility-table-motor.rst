
.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large

   * - Motor Driver Version
     - Python 3.13
     - Python 3.12
     - Python 3.11
     - Python 3.10
     - Python 3.9
     - Python 3.8
     - Python 3.7

   * - 3.7
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     -
     - 

   * - 3.6
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - 

   * - 3.5
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - 

   * - 3.3 to 3.4
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.1 to 3.2
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓
     - ✓

   * - 3.0
     -
     -
     -
     - ✓
     - ✓
     - ✓
     - ✓

- Motor 3.7 wraps PyMongo 4.10
- Motor 3.6 wraps PyMongo 4.9
- Motor 3.5 wraps PyMongo 4.5 to 4.8
- Motor 3.3 and 3.4 wrap PyMongo 4.5
- Motor 3.2 wraps PyMongo 4.4+
- Motor 3.1 wraps PyMongo 4.2+
- Motor 3.0 wraps PyMongo 4.1+

.. note::

   - For asyncio support, Motor requires Python 3.4+, or
     Python 3.3 with the `asyncio package from PyPI
     <https://pypi.python.org/pypi/asyncio>`_.

   - Motor 2.3+ supports Windows.
