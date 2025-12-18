.. facet::
   :name: programming_language
   :values: csharp, go, java, javascript/typescript, php, python, ruby, rust, scala, shell

.. _mongodb-uri:
.. _find-connection-string:

==================
Connection Strings
==================

.. meta:: 
   :keywords: atlas, drivers, code example, node.js, compass, atlas cli, atlas ui
   :description: Use connection strings to establish connections between MongoDB instances, tools, and applications that use drivers. 

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

.. composable-tutorial::
   :options: deployment-type, interface-atlas-only, topology, connection-string-format
   :defaults: atlas, atlas-cli, None, None

   You can use connection strings to define connections between
   MongoDB instances and the following destinations:

   - Your applications when you connect using :driver:`drivers </>`.
   - Tools such as :compass:`MongoDB Compass </>` and 
     :mongosh:`MongoDB Shell (mongosh) </>`.

   To connect to your cluster, you can use one of these connection
   string formats:

   - **SRV connection strings** use the ``mongodb+srv://`` prefix and
     provide a simplified way to connect to a cluster. SRV connection
     strings automatically include all the seed list hosts, which can
     change the servers in rotation without requiring client
     reconfiguration. When possible, use SRV connection strings instead
     of the standard connection string format.

   - **Standard connection strings** use the ``mongodb://`` prefix and
     require you to include all cluster members in replica sets and
     sharded clusters.

   Use the selectors at the top of the page to choose your deployment
   type and connection string format. Complete the following steps to
   find your connection string.

   .. selected-content::
      :selections: atlas, atlas-cli, None, None

      Find Your {+atlas+} Connection String
      -----------------------------------------

      To find your {+atlas+} connection string using the :atlascli:`Atlas CLI
      </>`, :atlascli:`install </install-atlas-cli/>` and
      :atlascli:`connect </connect-atlas-cli/>` from the Atlas CLI, then
      run the following command. Replace ``<clusterName>`` with the name
      of the {+atlas+} cluster and replace ``<projectId>`` with the
      project ID.

      .. code-block::

         atlas clusters connectionStrings describe <clusterName>
         --projectId <projectId>

      Your {+atlas+} connection string resembles the following 
      example:

      .. code-block:: bash

         mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority

      To learn more, see :atlascli:`atlas clusters connectionStrings
      describe </command/atlas-clusters-connectionStrings-describe/>`.

      Atlas Cluster that Authenticates with AWS IAM Credentials
      ---------------------------------------------------------

      .. include:: /includes/connection-string/atlas-aws-iam-example.rst

   .. selected-content::
      :selections: atlas, atlas-ui, None, None

      Find Your {+atlas+} Connection String
      -----------------------------------------

      To find your {+atlas+} connection string in the Atlas UI, follow
      these steps:

      .. include:: /includes/steps-find-atlas-connection-string.rst

      Your {+atlas+} connection string resembles the following 
      example:

      .. code-block:: bash

         mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority

      Atlas Cluster that Authenticates with AWS IAM Credentials
      ---------------------------------------------------------

      .. include:: /includes/connection-string/atlas-aws-iam-example.rst

   .. selected-content::
      :selections: self, None, replica-set, srv

      Find Your Self-Hosted Deployment's Connection String
      ----------------------------------------------------

      .. include:: /includes/connection-string/find-self-hosted-intro-rs.rst

      .. code-block:: bash

         mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com/?authSource=admin&replicaSet=myRepl

      .. include:: /includes/fact-pct-encode-uri.rst

      .. include:: /includes/connection-string/self-managed-examples.rst

   .. selected-content::
      :selections: self, None, replica-set, standard

      Find Your Self-Hosted Deployment's Connection String
      ----------------------------------------------------

      .. include:: /includes/connection-string/find-self-hosted-intro-rs.rst

      .. code-block:: bash

         mongodb://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?authSource=admin&replicaSet=myRepl

      .. include:: /includes/fact-pct-encode-uri.rst

      .. include:: /includes/connection-string/self-managed-examples.rst

   .. selected-content::
      :selections: self, None, sharded-cluster, srv

      Find Your Self-Hosted Deployment's Connection String
      ----------------------------------------------------

      .. include:: /includes/connection-string/find-self-hosted-intro-sharded.rst

      .. code-block:: bash

         mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@mongos0.example.com/?authSource=admin

      .. include:: /includes/fact-pct-encode-uri.rst

      .. include:: /includes/connection-string/self-managed-examples.rst

   .. selected-content::
      :selections: self, None, sharded-cluster, standard

      Find Your Self-Hosted Deployment's Connection String
      ----------------------------------------------------

      .. include:: /includes/connection-string/find-self-hosted-intro-sharded.rst

      .. code-block:: bash

         mongodb://myDatabaseUser:D1fficultP%40ssw0rd@mongos0.example.com:27017,mongos1.example.com:27017,mongos2.example.com:27017/?authSource=admin

      .. include:: /includes/fact-pct-encode-uri.rst

      .. include:: /includes/connection-string/self-managed-examples.rst

   .. selected-content::
      :selections: self, None, standalone, srv

      Find Your Self-Hosted Deployment's Connection String
      ----------------------------------------------------

      .. include:: /includes/connection-string/find-self-hosted-intro-standalone.rst

      .. code-block:: bash

         mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com/?authSource=admin

      .. include:: /includes/fact-pct-encode-uri.rst

      .. include:: /includes/connection-string/self-managed-examples.rst

   .. selected-content::
      :selections: self, None, standalone, standard

      Find Your Self-Hosted Deployment's Connection String
      ----------------------------------------------------

      .. include:: /includes/connection-string/find-self-hosted-intro-standalone.rst

      .. code-block:: bash

         mongodb://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin

      .. include:: /includes/fact-pct-encode-uri.rst

      .. include:: /includes/connection-string/self-managed-examples.rst

Learn More
----------

For a full list of connection string options, see
:ref:`connections-connection-options`.

.. toctree::
   :titlesonly: 
   :hidden: 

   Options </reference/connection-string-options>
   Formats </reference/connection-string-formats>
   
