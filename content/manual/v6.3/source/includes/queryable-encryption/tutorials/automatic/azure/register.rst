
.. procedure::
   :style: connected

   .. step:: Log in to `Azure <https://azure.microsoft.com/en-us/features/azure-portal/>`__.

   .. step:: Register your Application with Azure Active Directory

      .. _qe-tutorial-automatic-azure-register:

      To register an application on Azure Active Directory,
      follow Microsoft's official
      `Register an application with the Microsoft identity platform <https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app>`__
      Quick Start.

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. include:: /includes/queryable-encryption/tutorials/automatic/azure/record-credentials.rst

         .. tab::
            :tabid: python

            .. include:: /includes/queryable-encryption/tutorials/automatic/azure/record-credentials.rst

         .. tab::
            :tabid: java-sync

            .. important:: Record your Credentials
      
               Ensure you record the following credentials:

               - **tenant id**
               - **client id**
               - **client secret**
      
               Unless you are running your client within an Azure Virtual
               Machine, you will need these credentials to construct your
               ``kmsProviders`` object later in this tutorial.

         .. tab::
            :tabid: go

            .. include:: /includes/queryable-encryption/tutorials/automatic/azure/record-credentials.rst

         .. tab::
            :tabid: csharp

            .. include:: /includes/queryable-encryption/tutorials/automatic/azure/record-credentials.rst
