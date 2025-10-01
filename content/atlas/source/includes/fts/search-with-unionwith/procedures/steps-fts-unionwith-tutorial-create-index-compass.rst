Create the |fts| Index
~~~~~~~~~~~~~~~~~~~~~~

In this section, you will create a |fts| index named ``default`` on 
all the fields in the ``companies`` collection in the 
``sample_training`` database. You will create another |fts| index 
named ``default`` on all the fields in the ``inspections`` 
collection in the ``sample_training`` database. You must perform the 
following steps for each collection.

.. procedure:: 
   :style: normal

   .. step:: Connect to your deployment by using |compass|.

      Open {+Compass+} and connect to your cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, click the name of the database, then click the name
      of the collection.

   .. step:: Create the |fts| index.

      a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

      #. Click :guilabel:`Create Atlas Search Index` to open the index creation dialog box.

      #. Specify the |json| |fts| index definition. 

         .. literalinclude:: /includes/fts/lookup-with-search/create-index-example-compass.json
            :copyable: true
            :language: json
            :linenos:

      #. Click :guilabel:`Create Search Index`.
