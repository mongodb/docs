One of the following MongoDB cluster types:

- An :ref:`{+service+} cluster <create-new-cluster>` 
  running MongoDB version 6.0.11, 7.0.2, or later. 
  Ensure that your :abbr:`IP address (Internet Protocol address)`
  is included in your |service| project's :ref:`access list <access-list>`. 

- A local |service| deployment created using Python and Docker.
  Install ``atlas-local-lib-py`` (``pip install atlas-local-lib-py``) to
  programmatically create and manage local deployments.
  To learn more, see the `atlas-local-lib-py repository <https://github.com/mongodb/atlas-local-lib-py>`__.

- A MongoDB Community or Enterprise cluster with 
  :ref:`Search and Vector Search <community-search-deploy>` installed.
