Before you begin this tutorial, complete the following prerequisite steps:

1. Download the {+shared-library+} from the :website:`MongoDB Download Center </try/download/enterprise>`.
   Navigate to the :guilabel:`MongoDB Enterprise Server Download` section and select the follow options:
   
   - In the :guilabel:`Version` dropdown, select the version marked as ``"current"``.
   - In the :guilabel:`Platform` dropdown, select your platform.
   - In the :guilabel:`Package` dropdown, select ``crypt_shared``.
   
   Extract the archive and save the path to the shared library file for future use.

   .. note:: Query Analysis Component

      The {+shared-library+} is a preferred alternative to ``mongocryptd`` and
      does not require spawning a new process to perform automatic encryption.
      This tutorial uses the {+shared-library+}, but ``mongocryptd`` is still
      supported.

2. Configure a MongoDB Atlas cluster or a local replica set deployment, and save your
   connection string for future use. To learn more, see the :ref:`unified-get-started`
   tutorial.