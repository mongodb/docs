Upgrade |mms| from 1.2 and Earlier
++++++++++++++++++++++++++++++++++

.. default-domain:: mongodb

Due to the `company name change
<http://www.mongodb.com/press/10gen-announces-company-name-change-mongodb-i
nc>`_, the name of the MMS package changed between versions 1.2 and 1.3.
Therefore, to upgrade the |mms| server from *any* version before 1.3, use
the following procedure:

#. *Recommended.* Take a full backup of the MMS database before
   beginning the upgrade procedure.

#. Shut down MMS, using the following command:

   .. code-block:: sh

      /etc/init.d/10gen-mms stop

#. Download the latest package and proceed with the instructions
   for a fresh install. Do not attempt to use your package manager
   to do an upgrade. See
   :doc:`/monitoring/tutorial/install-monitoring-server` for more
   information.

   When complete, |mms| is installed in the ``/opt/mongodb/mms``
   directory.

#. Follow all procedures for a new install include configuring the
   options in ``/opt/mongodb/mms/conf/conf-mms.properties``. If you
   used encrypted authentication credentials you will need to
   regenerate these manually.  *Do not copy the credentials from
   your old properties file. Old credentials will not work.*

#. Start MMS  using the new package name:

   .. code-block:: sh

      sudo /etc/init.d/mongodb-mms start

#. Update any Monitoring Agent. See :ref:`upgrade-mms-agent` for
   more information.
