.. _adf-v20220823:

23 August 2022 Release
~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Adds support for optionally specifying an ISODate format to optimize 
  performance for date-type partitions.

.. _adf-v20220802:

02 August 2022 Release
~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Performs :ref:`$merge <adf-merge-stage>` in chunks.

.. _adf-v20220712:

12 July 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- |service| now charges for the total number of bytes that {+adf+} 
  processes from |http| sources.
- Adds support for the background option on the :ref:`$merge 
  <adf-merge-stage>` aggregation stage.

.. _adf-v20220621:

21 June 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Adds support for {+adl+} as a "Store Type" to the ``createStore`` command.
- Improves error messaging for Federated ``$search`` queries.

.. _adf-v20220607:

07 June 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Renames and relaunches {+adl+} as {+adf+}. 

  .. important:: 

     The federated query engine service previously called {+adl+} is 
     now called {+adf+}. To learn more about {+adf+}, see 
     :ref:`atlas-data-federation`.

.. _data-lake-v20220531:

31 May 2022 Release
~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Disables support for the MySQL dialect.

.. _data-lake-v20220510:

10 May 2022 Release
~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.

.. _data-lake-v20220419:

19 April 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Supports the following new MongoDB 5.2 aggregation operators:

  - ``$sortArray``
  - ``$topN``
  - ``$bottomN``
  - ``$maxN``
  - ``$firstN``
  - ``$lastN``

- Fixes a bug to allow you to use read preference for sharded clusters.

.. _data-lake-v20220329:

29 March 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.

.. _data-lake-v20220315:

15 March 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Imposes an upper :doc:`limit 
  </data-federation/supported-unsupported/limitations>` on 
  ``maxRowGroupSize``.

.. _data-lake-v20220215:

15 February 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Renames the ``matchComments`` field to ``queryFilterComments`` . To 
  learn more, see :ref:`adf-query-history-stage`.


.. _data-lake-v20220118:

18 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Improves performance and stability.
- Adds ``matchComments`` field to query history. To learn more,
  see :ref:`Retrieve Data Lake Query History <adf-query-history-stage>`.
