|fts| is an embedded full-text search feature that gives you a
seamless, scalable experience for building relevance-based app
features. This quick start demonstrates how to get started in the
following steps:

1. Deploy MongoDB Search in Docker.

   For more details on deploying by using a tarball or as an image in
   Docker, see :ref:`Install and Deploy MongoDB Search
   <community-search-deploy>`.

#. Load sample data into a MongoDB cluster.

#. Create a |fts| index on a sample collection.

#. Build a |fts| query to search the collection.

*Time required: 20 minutes*   

.. note::

   The resulting set up of this quick start is not secure. For more information
   on securing your deployment, see :manual:`Security for Self-Managed Deployments
   </administration/security-checklist>`.

Architecture
------------

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
----------------

Before you begin, you must complete the following prerequisites:

- Download Docker v4.40 or higher
- Download Docker Compose
- Download the ``curl`` command
- Download ``mongosh`` locally or have access to it through Docker

Set Up MongoDB Search in Docker
-------------------------------

In this section, you set up |fts| in Docker.

.. procedure::
   :style: normal

   .. include:: /includes/search/steps-self-managed-quick-start-setup.rst

.. |search-type| replace:: :guilabel:`MongoDB Search`
.. |index-name| replace:: ``default``
.. |collection| replace:: ``movies`` collection
.. |collection-name| replace:: ``movies`` collection
.. |database| replace:: ``sample_mflix`` database
.. |database-name| replace:: ``sample_mflix`` database
.. |index-name| replace:: ``default``
