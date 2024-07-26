.. procedure::
   :style: normal
  
   .. step:: Add the MongoDB Agent user to your databases.
      
      The MongoDB Agent user performs automation tasks for your MongoDB
      databases. Make sure this MongoDB user has the
      :ref:`proper privileges <mms-req-cred-automation>`.

   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-security.rst
      
   .. step:: Go to the :guilabel:`Security Settings` dialog for your deployment.

      Do one of the following actions:
  
      - If this is your first time configuring |tls|,
        authentication, or authorization settings for this project, 
        click :guilabel:`Get Started`.

      - If you have already configured |tls| authentication, or
        authorization settings for this project, click :guilabel:`Edit`.
      
   .. step:: Click :guilabel:`Edit Credentials`.
      
   .. step:: Continue through the modal until you see the :guilabel:`Configure Cloud Manager Agents` page.
      
   .. step:: Add the appropriate credentials:
      
      .. include:: /includes/tabs-mongodbagent-auth-settings.rst  
