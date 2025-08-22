Overview
--------

Learn how to **replicate** your **change data capture (CDC)** events with a
{+sink-connector+}. CDC is a software architecture that converts changes in a datastore
into a stream of **CDC events**. A CDC event is a message containing a
reproducible representation of a change performed on a datastore. Replicating
data is the process of applying the changes contained in CDC events from one data
store onto a different datastore so that the changes occur in both datastores.

Use a **CDC handler** to replicate CDC events stored on an {+kafka+} topic into MongoDB.
A CDC handler is a program that translates CDC events from a specific
**CDC event producer** into MongoDB write operations.

A CDC event producer is an application that generates CDC events. CDC event
producers can be datastores, or applications that watch datastores and generate
CDC events corresponding to changes in the datastores.

.. note::

   MongoDB change streams is an example of a CDC architecture. To learn more about
   change streams, see
   :doc:`the {+connector+} guide on Change Streams </source-connector/fundamentals/change-streams>`.

If you would like to view a tutorial demonstrating how to replicate data, see the
:doc:`Replicate Data With a Change Data Capture Handler tutorial </tutorials/replicate-with-cdc>`.

.. important:: CDC and Post Processors

   You cannot apply a :ref:`post processor <sink-fundamentals-post-processors>`
   to CDC event data. If you attempt to specify both, the connector logs a warning.


Specify a CDC Handler
---------------------

You can specify a CDC handler on your sink connector with the following configuration option:

.. code-block:: properties

   change.data.capture.handler=<cdc handler class>

To learn more, see
:doc:`change data capture configuration options </sink-connector/configuration-properties/cdc>`.

Available CDC Handlers
~~~~~~~~~~~~~~~~~~~~~~

The sink connector provides CDC handlers for the following CDC event producers:

- MongoDB
- `Debezium <https://debezium.io/>`__
- `Qlik Replicate <https://www.qlik.com/us/products/qlik-replicate>`__