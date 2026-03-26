This quick start demonstrates how to deploy |fts| and {+avs+} in Docker,
load sample data into the MongoDB cluster, create a vector search index 
for the sample data, and run vector search queries against the sample data.

*Time required: 20 minutes*

Objectives 
~~~~~~~~~~

The quick start walks you through the following steps:

1. Deploy MongoDB and ``mongot`` in Docker. 

   For more details on deploying by using a tarball or as an image in Docker,
   see :manual:`Install MongoDB Community and MongoDB Search </administration/install-community>`.

#. Load sample data, create a vector search index, and run vector search queries on your local deployment.

.. note::

   The resulting set up of this quick start is not secure. For
   more information on securing your deployment, see :manual:`Security for
   Self-Managed Deployments </administration/security-checklist>`. 

Architecture
~~~~~~~~~~~~

This tutorial creates the following architecture:

- A MongoDB Community Edition Server (``mongod``) with a single node replica set
  on port 27017
- A MongoDB Search (``mongot``) search engine component on port 27028
- Persistant data volumes on both ports
- Pre-loaded sample data

.. note::

   For a production deployment, MongoDB recommends that you use a replica
   set with at least three members.

Before You Begin
~~~~~~~~~~~~~~~~

Before you begin, you must complete the following prerequisites:

- Download Docker v4.40 or higher
- Download Docker Compose
- Download the ``curl`` command 
- Download ``mongosh`` locally or have access to it through Docker
- Create |voyage| |api| keys from the :ref:`{+atlas-ui+} <voyage-api-keys>` 
  or directly from :voyage-docs:`Voyage AI </api-key-and-installation>` 
  
  We recommend two separate keys to enable {+avs+} to :ref:`automatically 
  generate embeddings <avs-auto-embeddings>` at index- and query-time.

.. note:: 

   Your provider endpoint for generating embeddings depends on
   whether you create the |api| key from the {+atlas-ui+} or
   directly from |voyage|. 
