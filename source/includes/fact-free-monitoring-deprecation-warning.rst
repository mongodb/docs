.. warning:: Free monitoring is deprecated 

   Free monitoring was deprecated in April 2023 and will be decommissioned
   in August 2023. 

   Beginning in April 2023, you can’t enable free monitoring on MongoDB
   Community instances. Deployments currently using free monitoring can
   continue to access the free monitoring UI until August 2023.

   You can choose another monitoring option for your deployment:

   - **Deploy a MongoDB Atlas dedicated cluster**. :ref:`Migrate your
     data <live-migration>` to a :ref:`MongoDB Atlas
     <atlas-getting-started>` dedicated cluster sized M10 or greater,
     which includes several advanced monitoring and alerting features:

     - :ref:`Query Profiler <query-profiler>`
     - :ref:`Performance Advisor <performance-advisor>`
     - :ref:`Real-Time Performance Panel <real-time-metrics-status-tab>`

     Get $100 in Atlas credits by applying the code
     ``FREE-MONITORING-100``. Limited to the first 300 users.

   - **Deploy a MongoDB Atlas free cluster**. A free Atlas cluster includes
     basic monitoring and alerting capabilities. After you
     :atlas:`create a free cluster
     </tutorial/deploy-free-tier-cluster/>`, use :binary:`mongodump` and
     :binary:`mongorestore` to manually create a backup of your database
     and import your data from your MongoDB Community instance.

   - **Use MongoDB Cloud Manager**. The `MongoDB Cloud Manager
     <https://docs.cloudmanager.mongodb.com/>`_ free tier includes basic
     monitoring capabilities.