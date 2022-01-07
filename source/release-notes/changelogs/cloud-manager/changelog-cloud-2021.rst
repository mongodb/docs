.. _cloudmanager_20210105:

5 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`11.10.0.7307 <11.10.0.7307>`.

.. _cloudmanager_20211202:

2 December 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Removes support for macOS for the {+mdbagent+}.
- Updates {+mdbagent+} to :ref:`11.9.0.7253-1 <11.9.0.7253-1>`.

.. _cloudmanager_20211117:

17 November 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Improves speed and resiliency of snapshot restores when using
  {+mdbagent+} version 11.7.0.7183-1 and later.
- Updates {+mdbagent+} to :ref:`11.8.0.7223-1 <11.8.0.7223-1>`.

.. _cloudmanager_20211027:

27 October 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`11.7.0.7181-1 <11.7.0.7181-1>`.

.. _cloudmanager_20211006:

06 October 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`11.6.0.7119 <11.6.0.7119>`.

.. _cloudmanager_20210915:

15 September 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for time series collections in Data Explorer and Query 
  Profiler including:

  - Ability to create new time series collections and build secondary 
    indexes from the UI. 
  - Ability to visualize slow queries in times series collections.

- Updates the deployment security settings user interface for improved 
  usability.
- Updates {+mdbagent+} to :ref:`11.5.0.7078-1 <11.5.0.7078-1>`.

.. _cloudmanager_20210824:

25 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Adds metrics that report maximum observed values for all hardware 
  metrics. Your |mms| plan determines the :ref:`granularity 
  <monitoring-metrics-per-plan>` of these metrics.
- Adds the ability to specify :manual:`Sort 
  </reference/method/cursor.sort/>`, :manual:`Project
  </tutorial/project-fields-from-query-results>`, and :manual:`Collation
  </reference/collation/>` query options when you :ref:`query your data
  <de-view-documents>` using :guilabel:`Data Explorer`.
- Updates {+mdbagent+} to :ref:`11.4.0.7057-1 <11.4.0.7057-1>`.

.. _cloudmanager_20210803:

03 August 2021 Release
~~~~~~~~~~~~~~~~~~~~~~

- Fully removes personal |api| keys. Use :ref:`programmatic API keys <mms-prog-api-key>` 
  to access the :doc:`API </reference/api>`.
- Updates {+mdbagent+} to :ref:`11.3.0.7029-1 <11.3.0.7029-1>`.

.. _cloudmanager_20210713:

13 July 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces the general availability of 
  :manual:`MongoDB 5.0 </release-notes/5.0/>`, which includes 
  support for:

  - Time Series collections,
  - Live Re-Sharding,
  - the Versioned |api|,
  - Client Side Field Level Encryption via |aws| KMS, 
    Google Cloud KMS and Azure Key Vault,
  - and more.

- Updates {+mdbagent+} to :ref:`11.2.0.6985 <11.2.0.6985>`.

.. _cloudmanager_20210623:

23 June 2021 Release
~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`11.1.0.6961 <11.1.0.6961>`.


.. _cloudmanager_20210511:

11 May 2021 Release
~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`10.30.0.6882-1 <10.30.0.6882-1>`.

.. _cloudmanager_20210330:

30 March 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Introduces the ability to :ref:`trigger initial sync for a process <trigger-resync-for-a-process>`
  in the |service| user interface.

- Updates {+mdbagent+} to :ref:`10.28.0.6828-1 <10.28.0.6828-1>`.
- Changes the :ref:`protocolVersion <autoconfig-mongodb-replicasets>` 
  API parameter from an integer to a string. For example, previously, 
  you could specify  ``1`` for this parameter. Now, you must specify 
  ``"1"`` for this parameter instead.

.. _cloudmanager_20210309:

09 March 2021 Release
~~~~~~~~~~~~~~~~~~~~~

- Adds recommendations to :ref:`remove redundant indexes 
  <pa-drop-index>` in Performance Advisor.

- Updates {+mdbagent+} to :ref:`10.27.0.6799 <10.27.0.6799>`.

.. _cloudmanager_20210217:

17 February 2021 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Fixes a bug that ensures fixed ordering of index options for all nodes
  in a rolling index build.

- Updates {+mdbagent+} to :ref:`10.26.0.6757 <10.26.0.6757>`.

