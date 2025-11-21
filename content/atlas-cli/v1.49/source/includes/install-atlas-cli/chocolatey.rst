Install the {+atlas-cli+}
-------------------------

To install the {+atlas-cli+} using Chocolatey, follow the steps below.

Complete the Prerequisites
~~~~~~~~~~~~~~~~~~~~~~~~~~

To install the {+atlas-cli+} using Chocolatey, you must do the 
following:

1. Ensure that your system meets the `requirements <https://docs.chocolatey.org/en-us/choco/setup#requirements>`__ 
   for installing Chocolatey.
#. Install Chocolatey using ``cmd.exe`` or ``PowerShell.exe``. To 
    learn more, see `Installing Chocolatey <https://docs.chocolatey.org/en-us/choco/setup#installing-chocolatey>`__.

Procedure
~~~~~~~~~

.. procedure::
   :style: normal

   .. step:: Install the {+atlas-cli+}.

      .. code-block:: shell 

         choco install mongodb-atlas

   .. step:: When prompted, enter ``A`` to confirm installation.

   .. step:: Close and reopen your terminal after the installation to see the changes in your path.

   .. include:: /includes/steps-verify-atlas-cli.rst

Update the {+atlas-cli+}
------------------------

To update the {+atlas-cli+} with Chocolatey, follow these steps:

.. procedure::
   :style: normal

   .. step:: Install the {+atlas-cli+}.

      .. code-block:: shell 

         choco upgrade mongodb-atlas

   .. include:: /includes/steps-verify-update-atlas-cli.rst
