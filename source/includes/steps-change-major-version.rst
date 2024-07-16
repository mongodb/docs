.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Create an |service| cluster for your staging environment.
      
      .. note::
      
         You can skip this step if you already have an |service| cluster
         as your staging environment.
   
      Click the :guilabel:`Create` button to open the cluster 
      creation modal. Configure the staging cluster
      to match your production cluster. You do not have to enable 
      backups for the staging cluster.
      
      To learn how to create a new cluster, see :doc:`/tutorial/create-new-cluster`.
      
      .. important::
      
        If selecting a smaller cluster tier for the staging
        cluster, take into consideration that any performance tests run
        may not be representative of the performance of the upgraded
        production cluster. You may also need to select a larger storage
        size depending on the amount of data you want to mirror to your
        staging cluster.
      
   .. step:: Refresh the staging cluster with production cluster data.
      
      .. note::
      
         You can skip this step if you already have an up-to-date |service|
         cluster as a staging environment.
      
      If you have :doc:`backups enabled </backup-restore-cluster>` for the
      production cluster,
      :ref:`restore the most recent snapshot <restore-archive-snapshots>` and choose the
      staging cluster as the destination.
      
      If you do *not* have backups enabled for the production cluster,
      use |service| :doc:`Live Import </import/live-import>` to mirror data
      from your production cluster to the staging cluster. The live
      migration documentation includes specific instructions for creating
      staging environments.
      
   .. step:: Point your staging application at the staging cluster.

      Update your staging application to point at your
      staging cluster. For instructions on retrieving the MongoDB
      driver-friendly connection string for the staging
      cluster, see :doc:`/driver-connection`.
      
      Confirm that your application can connect successfully to the
      staging cluster *and* that the application operates as expected.
      
   .. step:: (Optional) Upgrade your application to the latest MongoDB drivers.

      Upgrading your application to the latest MongoDB drivers for your
      cluster's MongoDB version enables full access to the features
      provided by the newer MongoDB version. You may also find better
      performance or stability with newer driver versions. See
      :doc:`/driver-connection` for documentation on the recommended
      MongoDB driver for a given MongoDB version and connection
      examples. By using the :manual:`Stable API
      </reference/stable-api/>`, you can ensure that behavior
      changes between MongoDB versions do not break your application. 
      
      If you encounter a bug after upgrading your application,
      file a ticket in the :driver:`JIRA project for your MongoDB driver <>`.

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Update the staging cluster to the new major MongoDB version.
      
      a. Click :guilabel:`Edit Config` and select your staging 
         cluster from the drop-down menu.
      
      #. :ref:`Change the cluster version <scale-cluster-version>` to
         the desired major MongoDB Version.
      
         .. important::
      
            You cannot downgrade the MongoDB version of a |service|
            cluster. If you want to redeploy the staging environment with
            the original MongoDB version, you must terminate and re-create
            the cluster.
      
      #. Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      |service| automatically begins upgrading the cluster. Consider
      measuring the time required by |service| to upgrade the cluster to
      set a general expectation for your production cluster upgrade.
      
      :ref:`File a support ticket <major-version-upgrade-support>` if you
      encounter version-specific issues with the upgraded staging cluster.
      
   .. step:: Test your application against the upgraded staging cluster.
      
      Perform any required performance and operational testing of the
      staging cluster.
      
      :ref:`File a support ticket <major-version-upgrade-support>` if you
      encounter version-specific issues with the upgraded staging cluster.
      
      .. important::
      
        The major version upgrade requires at least one replica set
        election. Use the staging cluster as an opportunity to test your
        application's resiliance to primary failover. See
        :doc:`/tutorial/test-resilience/test-primary-failover` for complete
        documentation. 
      
   .. step:: Upgrade your production cluster to the target MongoDB version.

      Once you are confident in the performance and operation of
      your staging cluster, repeating the :doc:`upgrade </scale-cluster>`
      procedure for your production cluster.
      
      Once |service| completes the upgrade process, check that your
      production applications are still connected and operating normally.
      
      If you upgraded your staging application with newer MongoDB drivers
      *and* are satisfied with the performance and operation, consider
      scheduling a maintenance period for upgrading your production
      applications.
      
      If you encounter problems with the upgraded production cluster, file a
      High Priority support ticket using the procedure in the following
      section.
      