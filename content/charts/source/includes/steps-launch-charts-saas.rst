.. procedure::
   :style: normal

   .. step:: Log into MongoDB |service|.

      To access the |charts| application, you must be logged into
      `Atlas <https://cloud.mongodb.com>`_.

   .. step:: Select your desired |service| project, or create a new project.

      If you have an |service| :atlas:`project
      </tutorial/manage-projects/>`
      with clusters that contain data you want to visualize, select
      the project from the :guilabel:`Context` dropdown in the left
      navigation pane.

      If you do not have a suitable existing |service| project, see
      :atlas:`Create a Project
      </tutorial/manage-projects/#create-a-project>`
      in the |service| documentation for instructions on creating a
      new project.

   .. step:: (*Optional*) Invite people to your |service| project and shared |charts-short| instance.

      All |service| :atlas:`project users
      </tutorial/manage-users/#manage-project-users-and-teams>`
      with :atlas:`Project Roles
      </reference/user-roles/#project-roles>`
      other than ``Project Read Only``
      have access to the |charts-short| instance associated with that
      project. To add additional members to your |service|
      project, see :atlas:`Manage Project Users and Teams
      </tutorial/manage-users/#manage-project-users-and-teams>`
      in the |service| documentation.

   .. step:: (*Optional*) Create an |service| cluster.

      The |charts| application makes it easy to connect collections in 
      your cluster as :doc:`data sources </data-sources>`. Data
      sources reference specific collections and 
      :ref:`charts views <charts-views>` that you can access in the
      :doc:`Chart Builder </build-charts>` to visualize the data in 
      those collections or charts views.

      .. note::

         You can skip this step if you already have an |service| 
         cluster in the current :atlas:`project
         </tutorial/manage-projects/>`.

      To create an |service| cluster:

      a. In the left navigation menu, click :guilabel:`Clusters`.

      #. Click :guilabel:`Build a New Cluster`.

      #. In the :guilabel:`Create New Cluster` page, choose your 
         preferred cloud provider and region, cluster tier, and 
         additional settings. As you build your cluster, |service| 
         displays the associated cluster costs at the bottom of the page.

         .. note::

            |service| provides a Free Tier ``M0`` replica set as well as
            paid ``M10+`` clusters. Free Tier deployments have 
            restrictions as compared to paid ``M10+`` deployments, but 
            will work for the purposes of this setup and all 
            |charts-short| tutorials offered in this documentation. For 
            complete documentation on these restrictions, see
            `Atlas M0 (Free Tier), M2, and M5 Limitations
            <https://docs.atlas.mongodb.com/reference/free-shared-limitations/>`_.

      #. The default cluster name is :guilabel:`Cluster0`. If you want 
         to change your cluster name, do so now, as cluster names 
         cannot be changed once configured.

      #. Click the :guilabel:`Create Cluster` button to deploy
         your cluster.

         Your new cluster connects to |charts-short| automatically.

      .. note::

         For complete instructions on creating an |service| cluster and
         details on all available configuration options, see
         :atlas:`Create a Cluster
         </create-new-cluster/>`
         in the |service| documentation.

   .. include:: /includes/nav/steps-charts.rst

   .. step:: View :guilabel:`Charts`.

      .. note::

         When you first launch |charts| in a project, |charts-short| 
         automatically creates a new 
         :atlas:`user </access/manage-project-access/>` named 
         :guilabel:`Charts User` with the ``Project Charts Admin`` role 
         in your |service| project to access your cluster data.

      .. tabs::

         .. tab:: Returning Charts Users
            :tabid: returning

            If you have previously used |charts-short|, you will either 
            see your existing dashboards or be prompted to 
            :ref:`add a new dashboard <create-new-dashboard>`.

         .. tab:: New Charts Users
            :tabid: new

            If you are a new |charts-short| user, |charts| directs you 
            to the |charts-short| Getting Started tutorial. 

            The |charts-short| 
            :ref:`welcome-experience` provides two 
            possible paths to begin using |charts-short|:

            - :ref:`welcome-connect-data`

            - :ref:`welcome-explore-data`

            Additionally, |charts| automatically creates a new, empty 
            dashboard named ``<YOUR-NAME>'s Dashboard`` of which you 
            are the ``Owner``. This dashboard is private by default, 
            but you can :ref:`modify dashboard permissions 
            <modify-dashboard-permissions>` as you would any other 
            dashboard.

      To navigate back to the |service| :guilabel:`Clusters` view, 
      click :guilabel:`Data Services` at the top of the |charts| 
      application.
