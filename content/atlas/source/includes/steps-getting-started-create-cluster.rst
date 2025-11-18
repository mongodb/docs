.. procedure::
   :style: normal
      
   .. step:: Log in to |service|.

      Complete any welcome prompts. If you're logging in for the first time, |service| sometimes skips the next two steps.
      
   .. step:: Go to the :guilabel:`Project Overview` page for your project.

      a. If it is not already displayed, select the organization that
         contains your desired project from the |ui-org-menu| in the
         navigation bar.
      
      #. If it is not already displayed, select your desired project
         from the :guilabel:`Projects` menu in the navigation bar.
      
      #. If the `Overview 
         <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Foverview>`__ page is not already 
         displayed, click :guilabel:`Project Overview` in the sidebar.
      
   .. step:: Create a {+cluster+}.

      Click the :guilabel:`Create` button to create a {+cluster+}.
      
   .. step:: Select the :guilabel:`M0` option.

      ``M0`` {+clusters+} are free forever and suitable for
      users learning MongoDB or developing small proof-of-concept
      applications.
      
   .. step:: Select your preferred :guilabel:`Provider`.

      |service| supports ``M0`` {+Free-clusters+} on
      :ref:`Amazon Web Services (AWS) <amazon-aws>`,
      :ref:`Google Cloud Platform (GCP) <google-gcp>`, and
      :ref:`Microsoft Azure <microsoft-azure>`.
      
   .. step:: Select your preferred :guilabel:`Region`.

      |service| displays only the cloud provider
      regions that support ``M0`` {+Free-clusters+}.
      
   .. step:: Specify a name for your {+cluster+} in the :guilabel:`Name` box.
      
      You can specify any name for your {+cluster+}. The {+cluster+} name
      can contain ASCII letters, numbers, and hyphens.
      
      You can't change the {+cluster+} name after |service| deploys the 
      {+cluster+}. {+Cluster+} names can't exceed 64 characters in length.
      
   .. step:: Click :guilabel:`Create` to deploy the {+cluster+}.
      
      The :guilabel:`Security Quickstart` wizard appears.
      
      To learn more about the security features available, see 
      :ref:`setup-cluster-security`.
      
      Once you deploy your free |service| cluster, it takes less than 15 seconds for
      it to become ready to use.
      
   .. step:: Create a database user.
      
      a. Specify a :guilabel:`Username` for your database user.
      
      #. Specify a :guilabel:`Password` or copy the secure password that
         |service| suggests.
      
      #. Click :guilabel:`Create Database User`.
      
   .. step:: Add your IP address to the IP access list.
      
      a. Click :guilabel:`Add My Current IP Address`.
      
      #. Click :guilabel:`Finish and Close`.
      
      #. Click :guilabel:`Go to Overview`.
