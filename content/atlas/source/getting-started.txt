:orphan:

.. _atlas-getting-started:

======================
Get Started with Atlas
======================

.. default-domain:: mongodb

.. meta:: 
   :description: How to create an Atlas cluster, connect to it, and load sample data using the Atlas CLI or user interface.
   :keywords: atlas cli, atlas ui

.. facet::
   :name: genre
   :values: tutorial

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Overview
--------

|service-fullname| provides an easy way to host and manage your data in
the cloud. This tutorial guides you through creating an |service|
{+cluster+}, connecting to it, and loading sample 
data.

You can get started with |service| through the :atlascli:`{+atlas-cli+} 
</>` or the |service| User Interface. Select a tab based on how you
would like to get started:

.. tabs::

   .. tab:: {+atlas-cli+}
      :tabid: atlascli

      .. include:: /includes/extracts/atlas-setup.rst
      
      You can also run ``atlas setup`` if you have an |service| account
      and an organization/project, but you haven't set up a {+cluster+}.

   .. tab:: {+atlas-ui+}
      :tabid: ui

      To get started using the {+atlas-ui+}:

      .. procedure::

         .. step:: Create an |service| account.

            :doc:`Register for an Atlas account
            </tutorial/create-atlas-account>` using your Google Account
            or an email address.

         .. step:: Deploy a {+Free-cluster+}.

            :doc:`Create and deploy a {+Free-cluster+} 
            </tutorial/deploy-free-tier-cluster>`. You can use |service|
            {+Free-clusters+} as a small-scale development
            environment to host your data. {+Free-clusters+} never expire, and
            provide access to a :ref:`subset <atlas-free-tier>` of |service| 
            features.

         .. step:: Manage database users for your {+cluster+}.

            :doc:`Manage database users for your {+cluster+}
            </tutorial/create-mongodb-user-for-cluster>`. For
            security purposes, |service| requires clients to authenticate as 
            MongoDB database users to access {+clusters+}.

         .. step:: Manage the IP access list.

            :doc:`Manage the list of trusted IP addresses
            </security/add-ip-address-to-list>`. An |ipaddr| uniquely 
            identifies a device connecting to a network. In |service|, you 
            can connect to a {+cluster+} only from a trusted IP address. 
            Within |service|, you can create a list of trusted IP addresses, 
            referred to as an IP access list. An IP accesss list defines 
            the IP addresses that can connect to your {+cluster+} and access 
            your data.

         .. step:: Connect to your {+cluster+}.

            :ref:`Connect to your {+cluster+} 
            <atlas-connect-to-deployment>` using the {+mongosh+}, the 
            :driver:`Node.js driver </node/>`, the :driver:`PyMongo driver
            </python/>`, or :compass:`Compass </>`.

         .. step:: Insert and view a document.

            :doc:`Insert a document into your cluster
            </tutorial/insert-data-into-your-cluster>` using one of the 
            supported :driver:`MongoDB Drivers </>`. MongoDB drivers let you 
            interact with your databases programmatically with a supported 
            programming language. 

         .. step:: Load sample data.

            :ref:`Load sample data into your Atlas {+clusters+} 
            <sample-data>`. |service| provides sample data that you can
            load into your |service| {+clusters+}. You can use this
            data to quickly get started experimenting with data in
            MongoDB and using tools such as the :ref:`{+atlas-ui+}
            <atlas-ui>` and :charts:`MongoDB Charts </>`.

            You can also generate synthetic data that aligns to your 
            real data's schema. To learn more, see 
            :ref:`synthetic-data`.

Go Further with |service|
-------------------------

Build full-text search on top of your data. To learn more, see 
:ref:`fts-top-ref`.

.. toctree::
   :titlesonly:

   Create an Account </tutorial/create-atlas-account>
   Deploy a Free Cluster </tutorial/deploy-free-tier-cluster>
   Manage Database Users </tutorial/create-mongodb-user-for-cluster>
   Manage the IP Access List </security/add-ip-address-to-list>
   Connect to the Cluster </connect-to-database-deployment>
   Insert and View a Document </tutorial/insert-data-into-your-cluster>
   Load Sample Data </sample-data>
   Generate Synthetic Data </synthetic-data>
