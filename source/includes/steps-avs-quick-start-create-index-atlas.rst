
.. procedure:: 
   :style: normal 

   .. step:: Set up your |service| {+cluster+}.

      a. `Create a free Atlas account or sign in to an existing account <https://account.mongodb.com/account/register?tck=docs_atlas>`__.

      #. If you don't yet have an |service| cluster, `create a free M0 cluster <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23clusters%2Fedit%3Ffrom%3DctaClusterHeader>`__.
         To learn more about creating an |service| cluster, see :ref:`Create a Cluster <create-new-cluster>`.
         
         .. note:: 

            If you are working with an existing cluster, you must have 
            :authrole:`Project Data Access Admin` or higher :ref:`access <who-can-access-project>` to your 
            |service| project.

            If you create a new cluster, you have the necessary permissions by default.

         You can create only one ``M0`` {+Free-cluster+} per :ref:`project. <atlas-ui-auth-projects>`

      #. In the left sidebar, click `Atlas Search <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2FatlasSearch>`__. 
         Choose your cluster from the :guilabel:`Select data source` menu and click :guilabel:`Go to Atlas Search`.

      #. If you haven't yet loaded the sample dataset onto your {+cluster+},
         click :guilabel:`Load a Sample Dataset`. In the Load Sample Dataset 
         dialog box, click :guilabel:`Load Sample Dataset` to confirm. 

         If you already loaded the sample dataset, :ref:`check <atlas-ui-collections>` 
         that the ``sample_mflix`` database contains the ``embedded_movies`` 
         collection. If it doesn't, :ref:`drop <atlas-ui-drop-a-db>` the sample databases and 
         :ref:`reload <sample-data>` the sample dataset.

         Loading the :ref:`sample dataset <vector-search-quickstart-sample-data>` 
         can take several minutes to complete. 

   .. step:: Create a Vector Search index.
      
      .. |search-type| replace:: {+avs+}
      
      .. include:: /includes/fact-search-commands-cluster-tier.rst

      .. tabs-drivers::

         .. tab::
            :tabid: atlas-ui

            .. include:: /includes/avs-quick-start-ui-create-index.rst

         .. tab::
            :tabid: shell

            .. include:: /includes/avs-quick-start-mongosh-atlas-create-index.rst

         .. tab::
            :tabid: c

            .. include:: /includes/avs-quick-start-c-create-index.rst

         .. tab::
            :tabid: cpp

            .. include:: /includes/avs-quick-start-cpp-create-index.rst

         .. tab::
            :tabid: csharp

            .. include:: /includes/avs-quick-start-csharp-create-index.rst

         .. tab::
            :tabid: go

            .. include:: /includes/avs-quick-start-go-create-index.rst

         .. tab::
            :tabid: java-sync

            .. include:: /includes/avs-quick-start-java-create-index.rst

         .. tab::
            :tabid: kotlin-coroutine

            .. include:: /includes/avs-quick-start-kotlin-coroutine-create-index.rst

         .. tab::
            :tabid: kotlin-sync

            .. include:: /includes/avs-quick-start-kotlin-sync-create-index.rst

         .. tab::
            :tabid: nodejs

            .. include:: /includes/avs-quick-start-javascript-create-index.rst

         .. tab::
            :tabid: php

            .. include:: /includes/avs-quick-start-php-create-index.rst

         .. tab::
            :tabid: python

            .. include:: /includes/avs-quick-start-python-create-index.rst

         .. tab::
            :tabid: ruby

            .. include:: /includes/avs-quick-start-ui-create-index.rst

         .. tab::
            :tabid: rust

            .. include:: /includes/avs-quick-start-rust-create-index.rst

         .. tab::
            :tabid: scala

            .. include:: /includes/avs-quick-start-scala-create-index.rst
