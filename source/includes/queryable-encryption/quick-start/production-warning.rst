.. important:: Do Not Use this Sample Application In Production

   Because the instructions in this tutorial include storing an encryption key in an insecure
   environment, you should not use an unmodified version of this
   application in production. Using this application in production risks
   unauthorized access to the encryption key or loss of the key needed to
   decrypt your data. The purpose of this tutorial is to demonstrate how to use
   {+qe+} without needing to set up a {+kms-long+}.

   You can use a {+kms-long+} to securely store your encryption key in a production
   environment. A {+kms-abbr+} is a remote service that securely stores and manages your
   encryption keys. To learn how to set up a {+qe+} enabled application that
   uses a {+kms-abbr+}, see the :ref:`{+qe+} Tutorials <qe-tutorial-automatic-encryption>`.
