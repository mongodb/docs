Run the following Atlas CLI command to create the search index:

.. code-block:: bash

   atlas clusters search indexes create \
     --clusterName <clusterName> \
     --db sample_mflix \
     --collection movies \
     --field mappings.fields.plot.type=string \
     --indexName partial-match-tutorial

.. note::

   Before running this command, ensure that you have:

   - `Installed and configured the Atlas CLI <https://www.mongodb.com/docs/atlas/cli/current/>`__
   - Authenticated with your Atlas account using ``atlas auth login``
   - Set your project context using ``atlas config set project_id <projectId>``