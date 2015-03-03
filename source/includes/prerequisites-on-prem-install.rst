Deploy Servers
++++++++++++++

Prior to installation, you must set up servers for the entire |onprem|
deployment, including the |application|, the optional Backup Daemon, and
the :ref:`backing replica sets <backing-database>`. For deployment diagrams,
see :ref:`deployment-diagrams`.

Deploy servers that meet the hardware requirements described in
:doc:`/core/requirements`. The
servers for the backing replica sets must also comply with the
:manual:`Production Notes </administration/production-notes>` in the
MongoDB manual. Configure as many servers as needed for your deployment.

Deploy MongoDB
++++++++++++++

Install MongoDB on the servers that will store the
:ref:`mms-application-database` and :ref:`mms-backup-blockstore-database`.
The Backup Blockstore Database is required only if you run the Backup
Daemon. The databases require dedicated MongoDB instances. Do **not** use
MongoDB installations that store other data.

Install separate MongoDB instances for the two databases and install the
instances as replica sets. Ensure that firewall rules on the servers allow
access to the :doc:`ports </reference/firewall-configuration>` that the instances runs
on.

For more information, see :doc:`/tutorial/prepare-backing-mongodb-instances`.
