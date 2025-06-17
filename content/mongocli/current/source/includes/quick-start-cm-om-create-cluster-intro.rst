The following command creates a sample cluster with the following settings:

- Cluster name: ``getStarted`` 
- MongoDB server version: ``5.0.0``
- Feature compatibility version: ``5.0``
- Replica set members: ``3``
- Member hostnames: ``host1``, ``host2``, ``host3``

  .. note:: 
  
     This tutorial uses the hostnames ``host1``, ``host2``, and ``host3``. 
     Replace these hostnames with valid MongoDB server hostnames.

- Data directories for each ``mongod`` instance: ``/data/cluster/rs1``, 
  ``/data/cluster/rs2``, ``/data/cluster/rs3``
- Log file path for each ``mongod`` instance: ``/data/cluster/rs1/mongodb.log``, 
  ``/data/cluster/rs2/mongodb.log``, ``/data/cluster/rs3/mongodb.log``
- Port for each ``mongod`` process: ``29010``, ``29020``, ``29030``
- Voting priority for each member: ``1``
- Number of votes for each member: ``1``
