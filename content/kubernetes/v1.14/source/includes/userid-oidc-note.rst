.. note:: 

   Note: To grant permissions for this identity, you must also create a 
   ``MongoDBUser`` resource. The username in that resource must be set to 
   ``billing-service-auth/<user-subject-from-jwt>``. 
   
   To learn more, see :ref:`Manage Database Users Using OIDC Authentication <k8s-manage-db-users-oidc>`.