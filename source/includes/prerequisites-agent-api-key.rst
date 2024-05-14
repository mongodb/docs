Acquire an Agent |api| Key
---------------------------

The {+mdbagent+} requires one Agent |api| Key per project to communicate
with the |application|.

If you do not have an existing Agent |api| Key for your |mms| project,
create one:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-deployment.rst

   .. step:: Generate the |api| key.

      a. Go to the :guilabel:`Agents` page.

      #. Click :guilabel:`Agent API Keys`.

      #. Click :icon:`plus` :guilabel:`Generate`.

         .. note::

            This button appears if both of the following criteria are 
            true:

            - The current user is the :authrole:`Project Owner`.
            - The project has no Agent API Keys other than the
              :guilabel:`Original Group API Key` with an exclamation 
              :icon-fa5:`exclamation-circle` next to it. This type of 
              key exists in projects created before the 
              :ref:`new Agent API Key model 
              <new-agent-api-keys-model>`. In the new model, you can 
              create multiple Agent |api| Keys in a project, and any 
              the project's {+mdbagent+}s can use any of the keys.

      #. In the :guilabel:`Generate Key` modal, provide a description 
         of the new Agent API Key in the :guilabel:`Description` box.

      #. Click :guilabel:`Generate`.

         .. include:: /includes/extracts/agent-api-key-admonition.rst
