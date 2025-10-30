.. procedure::
   :style: normal
   
   .. include:: /includes/nav/steps-backup-details.rst
      
   .. step:: Request your snapshot.
      
      a. Click the :guilabel:`Snapshots` sub-tab.
      #. In the :guilabel:`Actions` column, expand the 
         :icon-fa5:`ellipsis-v` :guilabel:`Actions` menu, and click 
         :guilabel:`Download` for the snapshot that you want to download.
      
         |service| generates a one-time use download link that expires
         within 1 hour after its creation. For |aws| or |azure|,
         |service| also generates a one-time-use download link for any
         :ref:`configured private endpoints
         <cluster-private-endpoint>` in the same region as the
         snapshot.
      
         The amount of time to create this link increases with the size of
         the |service| cluster.
      
      Once the download is ready, |service|:
      
      - Emails you an alert that your snapshot download is ready.
      - Displays the download link in the :guilabel:`Restores & Downloads` 
        tab.
      
      .. note:: Available via API
      
         As another option, you can request a restore snapshot using the
         :oas-bump-atlas-op:`API <creategroupclusterbackuprestorejob>`. The 
         {+atlas-admin-api+} returns the download link in the 
         ``deliveryUrl`` field for downloading over the public internet 
         and in the ``privateDownloadDeliveryUrls`` field for downloading 
         over the private endpoint in the same region as the 
         snapshot.
      
   .. step:: Add the |ipaddr| or |cidr| address of the client to your |service| project :ref:`IP access list <access-list>`.

      If the current project IP access list ranges do not cover the 
      target client |ipaddr| or |cidr| address, click :guilabel:`Add or 
      Modify your IP Addresses` to make changes to your |service| 
      project IP access list.

   .. include:: /includes/nav/steps-backup-details.rst

   .. step:: Retrieve your snapshot.
      
      a. Click the :guilabel:`Restores & Downloads` sub-tab.
      #. Navigate to the restore snapshot you created.
      #. Click :guilabel:`Download`.
      
   .. step:: Use your preferred archive utility to extract the archive and access the data files.
      
      |service| compresses the snapshot into a ``.tar.gz`` file. This
      archive includes the snapshot and the |mongod| logs.
      
      a. Extract the files in the archive.
      
         .. example::
      
            The following command uses the ``tar`` utility to extract a ``tar``archive with ``gzip`` compression.
      
            .. code-block:: shell
      
               tar -xvzf ~/Downloads/mongodb-snapshots/my-cluster-snapshot.tar.gz
      
      #. Access the data files by starting a :binary:`~bin.mongod` instance 
         on the host and pointing it at the extract directory using the
         :option:`--dbpath <mongod.--dbpath>` option. To learn more, see
         :manual:`Start mongod Processes 
         </tutorial/manage-mongodb-processes/#start-mongod-processes>`.
      
         .. example::
      
            The following command starts a :binary:`~bin.mongod` instance using
            the extracted data file directory:
      
            .. code-block:: shell
      
               mongod --dbpath ~/Downloads/mongodb-snapshots/my-cluster-snapshot/
