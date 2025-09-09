Create an environment file named ``.env`` in your project. This
file will contain your API keys for the agent, the MongoDB
connection string, and MongoDB database and collection names.

.. collapsible::
   :heading: .env
   :sub_heading: Copy and paste the following code into your .env file.
   :expanded: false

   Replace the placeholder values with your MongoDB connection
   string and your Voyage AI and OpenAI API keys.

   .. literalinclude:: /includes/avs/ai-agent/shared/ai-agent-env-variables.js
      :language: none
      :copyable:
   
   .. note::

      .. include:: /includes/search-shared/find-connection-string.rst
