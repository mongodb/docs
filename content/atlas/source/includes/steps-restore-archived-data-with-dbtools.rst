.. procedure::
   :style: normal 

   .. step:: Identify your {+Online-Archive+} version.

      Contact :doc:`Support </support>` for help with
      identifying your {+Online-Archive+} version. 
      
      .. tip::
      
         If you see the size and number of archived documents for
         your {+Online-Archive+}, you are using the latest version
         of {+Online-Archive+} on your |service| {+cluster+}.

   .. step:: Migrate data to a supported region, if needed.

      {+Online-Archive+} must be in one of the :ref:`Atlas Data
      Federation regions <atlas-data-federation-regions>`. If your
      archived data is currently not in any of the supported {+adf+}
      regions, request help from :doc:`Support </support>` to migrate
      data to any of the supported regions. We recommend that you select
      a region that is close to your |service| {+cluster+} because any 
      latency during archiving and querying after the move is dependent
      on the region where data is archived. To learn more, see `AWS
      Latency Variation <https://www.cloudping.co/grid>`__. 

      Migrating data from one region to another is seamless and doesn't
      negatively affect your connectivity to the archive during the
      migration. MongoDB doesn't charge for migrating data from one
      region to another. 

      .. note:: 

         If you decide to not migrate to a supported region, you can
         still run ``mongodump`` and ``mongorestore`` as described in
         the next 2 steps. However, running these utilities might be
         slow and result in premature crashing of the utility.

   .. step:: Create a binary export of the archived data. 

      Use ``mongodump`` to create a binary export of the archived data:

      .. code-block:: shell 
         :caption: mongodump Syntax 

         mongodump --archive="archive file name" --db="db name"

      To learn more, see the following resources: 
      
      - :binary:`~bin.mongodump`
      - :dbtools:`Example </mongodump/mongodump-examples/#output-to-an-archive-file>`

   .. step:: Load the exported data back to your |service| {+cluster+}.

      Use ``mongorestore`` to load data from the binary database dump
      created by ``mongodump``. 
      
      .. code-block:: shell 
         :caption: mongodump Syntax 

         mongorestore --archive="archive file name" 
      
      To learn more, see the following resources:

      - :binary:`~bin.mongorestore`
      - :dbtools:`Example </mongorestore/mongorestore-examples/#restore-from-an-archive-file>`

