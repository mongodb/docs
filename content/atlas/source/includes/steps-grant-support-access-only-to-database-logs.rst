.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-settings.rst
   
   .. step:: Block MongoDB Support Access to Atlas Cluster Infrastructure and Logs.

      a. Select :guilabel:`General Settings` from the :guilabel:`Settings` menu in the navigation bar.

      #. Toggle :guilabel:`Block MongoDB Support Access to Atlas Cluster Infrastructure and Logs` to ``Yes``.

   .. include:: /includes/nav/steps-db-deployments-page.rst
   
   .. step:: Grant Temporary Infrastructure Access to MongoDB Support.

      a. Select the ellipsis icon (:guilabel:`...`) to the right of the {+database-deployment+}.

      #. Select :guilabel:`Grant Temporary Infrastructure Access to MongoDB Support`.
      
      #. Select :guilabel:`Only database logs`.
      
      #. Click :guilabel:`Grant Access`.

         :gold:`IMPORTANT:` You can grant MongoDB Support staff access only to database logs for 24 hours. 
         Any downloads in progress won't be interrupted if you revoke this access. Database audit logs are 
         not included in this access grant.
