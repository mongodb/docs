============================================
Change the Size of the Operation Log (Oplog)
============================================

TODO write procedure

The :term:`oplog`, which support replication, is a :term:`capped
collection`. While the default sizing for the oplog is

This guide describes the process for changing the size if the default
size is too big or too small for the needs of your deployment

About the Oplog
---------------



Overview
--------

Procedure
---------

Quarantine the Instance
~~~~~~~~~~~~~~~~~~~~~~~

Save the Last Oplog Entry
~~~~~~~~~~~~~~~~~~~~~~~~~

Resize the Oplog
~~~~~~~~~~~~~~~~

Backup the Existing Oplog
`````````````````````````

This step is **optional.**

Drop the Existing Oplog
```````````````````````

Create a New Oplog
``````````````````

Insert Saved Oplog Entry in New Oplog
`````````````````````````````````````

Resart Instance
~~~~~~~~~~~~~~~

Other Replica Set Members
~~~~~~~~~~~~~~~~~~~~~~~~~
