For testing and prototyping environments, we recommend a node architecture
in which MongoDB processes and |fts| processes run on the same node.
In the following diagram of this deployment model, the |fts| ``mongot`` process runs alongside
``mongod`` on each node in the |service| cluster and they share the same resources.

.. image:: /includes/images/deployment/fts-architecture-diagram.png
   :alt: MongoDB Search architecture
   :figwidth: 100%

By default, |service| enables the |fts| ``mongot`` process on the same
node that runs the ``mongod`` process when you create your first
|product-name| index.

To learn how |fts| processes queries on this architecture, see
:ref:`about-mongot`.
