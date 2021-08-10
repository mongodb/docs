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

