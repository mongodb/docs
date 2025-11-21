Install the {+atlas-cli+}
-------------------------

To install the {+atlas-cli+} using Homebrew, follow the steps below.

Complete the Prerequisites
~~~~~~~~~~~~~~~~~~~~~~~~~~

To install the {+atlas-cli+} using Homebrew, you must:

1. Use a MacOS or Linux operating system.
#. Install `Homebrew <https://brew.sh/>`__.

Procedure
~~~~~~~~~

.. procedure::
   :style: normal

   .. step:: Install the {+atlas-cli+} and {+mongosh+}.

      Invoke the following ``brew`` command to install both the 
      {+atlas-cli+} and {+mongosh+}:

      .. code-block:: sh

         brew install mongodb-atlas

      .. note::

         You can also use the ``brew install mongodb-atlas-cli`` command to install both the {+atlas-cli+} and 
         {+mongosh+}. You can't install the {+atlas-cli+} alone
         on Homebrew.

Update the {+atlas-cli+}
------------------------

To update the {+atlas-cli+} with Homebrew, follow the steps below.

.. procedure::
   :style: normal

   .. step:: Update the {+atlas-cli+}.

      If you installed the {+atlas-cli+} and {+mongosh+} together using the ``mongodb-atlas`` package, invoke the following ``brew`` command:

      .. code-block:: sh

         brew update
         brew upgrade mongodb-atlas

      If you installed the {+atlas-cli+} and {+mongosh+} together
      using the ``mongodb-atlas-cli`` package, invoke the
      following ``brew`` command:

      .. code-block:: sh

         brew update
         brew upgrade mongodb-atlas-cli

   .. include:: /includes/steps-verify-update-atlas-cli.rst
