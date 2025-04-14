.. content copied from cloud-docs/source/includes/steps-avs-quick-start-create-index-atlas.rst

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

      #. In the left sidebar, click `Overview <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Foverview>`__.
         Choose your cluster and click :guilabel:`Connect`.

      #. Under Access your data through tools, click :guilabel:`Shell`.

         If you haven't already, follow the steps provided to download and
         install :binary:`mongosh`.
         
      #. Copy your connection string and click :guilabel:`Done`.

   .. include:: /includes/steps-ts-quick-start-mongosh.rst
