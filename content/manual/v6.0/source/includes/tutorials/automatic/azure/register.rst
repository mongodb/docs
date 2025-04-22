
.. procedure::
   :style: connected

   .. step:: Log in to `Azure <https://azure.microsoft.com/en-us/features/azure-portal/>`__.     

   .. step:: Register your Application with Azure Active Directory

      .. _csfle-tutorial-automatic-azure-register:

      To register an application on Azure Active Directory,
      follow Microsoft's official
      `Register an application with the Microsoft identity platform <https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app>`__
      Quick Start.
      
      .. important:: Record your Credentials
      
         Ensure you record the following credentials:

         - **tenant id**
         - **client id**
         - **client secret**

         You will need them to construct your ``kmsProviders`` object
         later in this tutorial.
