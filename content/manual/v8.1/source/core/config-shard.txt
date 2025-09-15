.. _config-shard-concept:

============
Config Shard
============

.. default-domain:: mongodb

.. meta:: 
   :description: A mongod node that provides both config server and shard server functionality is called a config shard.

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

.. include:: /includes/config-shard-intro.rst

A sharded cluster must have a config server, but it can be either a 
config shard (embedded config server) or a dedicated config server. 
Using a config shard reduces the number of nodes required and can 
simplify your deployment. A config shard cluster is also called an 
embedded config server cluster. You cannot use the same config server 
for multiple sharded clusters.

.. _config-shard-use-cases:

Use Cases
---------

.. include:: /includes/config-shard-use-cases.rst

Behavior
--------

In an embedded config server cluster, a config shard will be used to 
store cluster metadata and user data. It helps reduce the complexity of 
a sharded cluster deployment. 

You can store sharded and unsharded collection data in your config 
shard. It has all the properties of a shard as well as acting as the 
config server. 

.. _confirm-use-of-config-shard:

Confirm use of Config Shard
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/confirm-use-config-shard.rst

Commands
~~~~~~~~

To configure a dedicated config server to run as a config shard, run the
:dbcommand:`transitionFromDedicatedConfigServer` command. 

To configure a config shard to run as a dedicated config server, run the
:dbcommand:`transitionToDedicatedConfigServer` command.

Get Started
-----------

- :ref:`convert-replica-set-to-embedded-config-server`

- :ref:`Start a Sharded Cluster with a Config Shard <start-a-sharded-cluster-with-config-shard>`

Learn More
----------

- :ref:`Config Shards <sharded-cluster-config-server-config-shards>`
- :dbcommand:`transitionFromDedicatedConfigServer`
- :dbcommand:`transitionToDedicatedConfigServer`

.. toctree::
   :titlesonly:

   Convert a Replica Set to a Sharded Cluster with an Embedded Config Server </tutorial/convert-replica-set-to-embedded-config-server>
