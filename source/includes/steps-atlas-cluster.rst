.. We've removed the ability to select an Atlas cluster from a dropdown. Saving
   the steps here because the commit doesn't exist in the main repo history, so
   that we can pull this back in if it becomes relevant again.

If you are using MongoDB Atlas, you can select your Atlas cluster 
from the :guilabel:`Select a cluster` list, or you can enter the
:manual:`connection string </reference/connection-string>`.

If you are using an on-premises deployment, you must use the MongoDB
connection string.

.. tabs::

   .. tab:: Select a cluster
      :tabid: select-atlas-cluster
      
      a. Select the cluster.
      
         Clusters are displayed in a three-level hierarchy: 
         :guilabel:`Organization` > :guilabel:`Project` >
         :guilabel:`Cluster`, organized alphabetically. Only the first 100 clusters you are authorized to access are shown.

      #. If it isn't included in the connection string, enter the
         :guilabel:`Database` to connect to.
      
      #. If they aren't included in the connection string, enter the 
         :guilabel:`Username` and :guilabel:`Password` of your
         :ref:`Relational Migrator MongoDB user <rm-mongodb-service-user>`.
         
         Checking :guilabel:`Save password` saves the password securely
         on your machine, so you don't have to enter the :guilabel:`Username`
         and :guilabel:`Password` again when using the saved connection.

      If you leave any of the form fields for :guilabel:`Database`,
      :guilabel:`Username`, or :guilabel:`Password` blank, Relational
      Migrator uses the values from the Atlas cluster metadata.

   .. tab:: Enter MongoDB URI
      :tabid: enter-mongodb-uri

      a. In the :guilabel:`MongoDB connection string (URI)` field, input
         your :manual:`MongoDB URI </reference/connection-string>`.

      #. If it isn't included in the connection string, enter the
         :guilabel:`Database` to connect to.
      
      #. If they aren't included in the connection string, enter the 
         :guilabel:`Username` and :guilabel:`Password` of your
         :ref:`Relational Migrator MongoDB user <rm-mongodb-service-user>`.
         
         Checking :guilabel:`Save password` saves the password securely
         on your machine. Relational Migrator automatically fills in the 
         :guilabel:`Password` field when updating connection information.
      
      If you leave the form :guilabel:`Database`, :guilabel:`Username`, 
      or :guilabel:`Password` fields blank, Relational Migrator uses the
      values from the URI.