.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.
      
   .. step:: Select the :guilabel:`Private Endpoint` connection type.

   .. step:: Select the private endpoint to which you want to connect.

   .. step:: Create a Database User.
      
      .. important::
      
         **Skip this step** if |service| indicates in the
         :guilabel:`Setup connection security` step that you have at least
         one database user configured in your project. To manage existing
         database users, see :ref:`mongodb-users`.
      
      To access the {+database-deployment+}, you need a MongoDB user with 
      access to the desired database or databases on the 
      {+database-deployment+} in your project. If your
      project has no MongoDB users, |service| prompts you to create a new
      user with the :ref:`Atlas Admin <atlas-user-privileges>` role.
      
      a. Enter the new user's :guilabel:`Username`.
      #. Enter a :guilabel:`Password` for this new user or click
         :guilabel:`Autogenerate Secure Password`.
          
      #. Click :guilabel:`Create Database User` to save the user.
      
      Use this user to connect to your {+database-deployment+} in the 
      following step.
      
      Once you have added a database user, click 
      :guilabel:`Choose Your Connection Method`.
      
   .. step:: Click :guilabel:`Choose a connection method`.
