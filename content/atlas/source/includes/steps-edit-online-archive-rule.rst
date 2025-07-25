.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. include:: /includes/nav/steps-online-archive.rst
      
   .. step:: Click the ellipsis (``...``) in the :guilabel:`Actions` column for the online archive to display the list of allowed actions.
      You can: 
      
      - :guilabel:`Pause Archiving` (only if state is :guilabel:`Active`)
      - :guilabel:`Edit Archive`
      - :guilabel:`Delete Archive`
      - :guilabel:`Resume Archiving` (only if state is :guilabel:`Paused`)
      
   .. step:: Select :guilabel:`Edit Archive` from the dropdown to make changes to your archiving rule, the number of days to keep archived data, and the time window for running data archiving jobs.
      
      You can change the archiving criteria and the number of days after 
      which to delete archived data.
      
      - To edit :guilabel:`Date Match` criteria, modify the number of 
        days |service| stores data on the active |service| cluster in the 
        :guilabel:`Archival Age Limit` section.
      
      - To edit :guilabel:`Custom Criteria`, enter a valid |json| filter 
        to select the documents for archiving. 
      
        .. note::
      
           |service| uses the specified query with the 
           :manual:`db.collection.find(query) 
           </reference/method/db.collection.find/>` command. Custom queries 
           do not support JavaScript expressions. Also, you can't pass an 
           empty document ``{}`` to return all documents.
      
      - To modify the number of days after which |service| deletes archived 
        data, enter or modify the number of days in the :guilabel:`Deletion 
        Age Limit` section. You can specify between ``7`` and ``9125`` 
        days, or leave the field empty to disable the data expiration rule. 
        It takes 24 hours for this change to take effect. 
      
      - To modify the scheduled time for data archiving jobs, make changes 
        to any of the following: 
      
        - Frequency. You can choose to run the job every day, on a specific 
          day of the week, or on a specific date every month. If you 
          wish to archive on the 29th, 30th, or 31st of every month, 
          |service| doesn't run the archiving job for those months that 
          don't include those dates. 
        - Time window. Select the period of time during which you want 
          |service| to run the data archiving job. You must specify a 
          minimum of two hours.
      
        You can also disable the schedule by toggling :guilabel:`Schedule 
        Archive Window`. If you disable the schedule, |service| reverts to 
        the default schedule and :ref:`runs the archiving job periodically 
        <adf-oa-performance-expectations>`.
      
        |service| starts using the new data archiving schedule immediately 
        after you change it. However, if an archiving job is currently 
        running, |service| doesn't interrupt the running job and the 
        setting takes effect after the job completes.
      
   .. step:: Click :guilabel:`Save` for the changes to take effect.
      
      .. note:: 
      
         It takes 24 hours for changes to :guilabel:`Deletion Age Limit` to 
         take effect.
         
      
