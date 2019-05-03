Acquire an Agent |api| Key
~~~~~~~~~~~~~~~~~~~~~~~~~~

The {+mdbagent+} requires one Agent |api| Key per project to
communicate with the |application|.

If you do not have an existing Agent |api| Key for your |mms| project,
you need to create one:

1. Click :guilabel:`Deployment`.

#. Navigate to :guilabel:`Agents`.

#. Click :guilabel:`Agent API Keys`.

#. Click :icon:`plus` :guilabel:`Generate`.

   .. note::

      This button appears if:

      1. The current user is the :authrole:`Project Owner` and
      #. The project has no Agent API Keys other than the
         :guilabel:`Original Group API Key`.

         The :guilabel:`Original Group API Key` exists in projects
         created prior to the new Agent API Key model and is indicated
         with :icon-fa5:`exclamation-circle`.

   The new model allows a project to have more than one Agent |api|
   Key and permits any of the project's agents to use any of the
   keys.

   To learn more about the new Agent API Keys, see :doc:`/tutorial/manage-agent-api-key`.

#. In the :guilabel:`Generate Key` modal, provide a description of the
   new Agent API Key in the :guilabel:`Description` box.

#. Click :guilabel:`Generate`.

   .. include:: /includes/extracts/agent-api-key-admonition.rst
