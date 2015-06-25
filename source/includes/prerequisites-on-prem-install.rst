Deploy Servers
++++++++++++++

Prior to installation, you must set up servers for the entire |onprem|
deployment, including the |application|, the optional Backup Daemon, and
the :ref:`backing replica sets <backing-database>`. For deployment diagrams,
see :ref:`deployment-diagrams`.

Deploy servers that meet the hardware requirements described in
:doc:`/core/requirements`. Servers for the Backup Daemon and the
backing replica sets must also comply with the
:manual:`Production Notes </administration/production-notes>` in the
MongoDB manual. Configure as many servers as needed for your deployment.

.. warning::

   Failure to configure servers according to the :manual:`MongoDB
   Production Notes </administration/production-notes>` can lead to
   production failure.

Deploy MongoDB
++++++++++++++

Install MongoDB on the servers that will store the
:ref:`mms-application-database` and :ref:`backup-database`.
The Backup Database is required only if you run the Backup
Daemon. The databases require dedicated MongoDB instances. Do **not** use
MongoDB installations that store other data.

Install separate MongoDB instances for the two databases and install the
instances as replica sets. Ensure that firewall rules on the servers allow
access to the :doc:`ports </reference/firewall-configuration>` that the
instances runs on.

Install MongoDB on each server using the :manual:`install procedures in
the MongoDB manual </administration/install-on-linux/>`. If you choose to
install :term:`MongoDB Enterprise` for the backing database, you must
install the MongoDB Enterprise dependencies, as described in the install
procedures.

The |application| and Backup Daemon must authenticate to the databases
as a MongoDB user with appropriate access. The user must have the
following roles:

- :authrole:`readWriteAnyDatabase`

- :authrole:`dbAdminAnyDatabase`.

- :authrole:`clusterAdmin` if the database is a sharded cluster, otherwise
  :authrole:`clusterMonitor`
