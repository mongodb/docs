.. procedure::
   :style: normal

   .. step:: Navigate to the {+df+} dashboard in |service|.

      Select :guilabel:`Data Federation` from the left navigation panel.

   .. step:: Click :guilabel:`Create Federated Database Instance`.

      If you have an existing {+fdi+}, instead click 
      :guilabel:`Create Federated Database` in the 
      top right corner of the dashboard. 

   .. step:: Under :guilabel:`Data Sources`, select :guilabel:`AWS S3`.

      You can use a sample dataset to start exploring 
      {+asql+} through {+adf+} without configuring a data source 
      yourself.

      .. tip:: Configure Data Sources

         To learn more about configuring different types of data 
         sources, see :ref:`config-adf`.

         If you want to configure data from a |service| cluster, you 
         must use MongoDB version 5.0 or greater for that cluster to 
         take advantage of {+asql+}.
      
   .. step:: Add sample data to your {+fdi+}.

      Expand the |s3| store ``sample-data-atlas-data-lake`` if it isn't 
      expanded already.

      For this tutorial, configure your {+fdi+} as follows using the 
      :guilabel:`Federated Database Instance` panel:
      
      .. procedure::
         :style: connected

         .. step:: Rename the default collection.

            Click :icon-fa4:`pencil` next to the default collection 
            ``Collection0`` to edit its name. For this tutorial, rename 
            your collection ``Sessions``.

         .. step:: Create a second collection.

            Click :icon-fa4:`plus-square` next to the default name 
            ``Database0`` to add a collection to the database. For this 
            tutorial, name your new collection ``Users``.

         .. step:: Add data to your virtual database.

            Drag and drop the following data sources into the respective {+fdi+} virtual collections:

            - ``/mflix/sessions.json``, into the ``Sessions`` 
              collection, and
            - ``/mflix/users.json`` into the ``Users`` collection.

   .. step:: Click :guilabel:`Save`.

      Your {+fdi+} displays a success message.
