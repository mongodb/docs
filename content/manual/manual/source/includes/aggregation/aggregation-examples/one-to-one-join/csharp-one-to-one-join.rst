.. start-prep-steps

Create the Template App
~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/aggregation/aggregation-examples/template-apps/csharp-template-app.rst

Create the Collection
~~~~~~~~~~~~~~~~~~~~~

This example uses two collections:

- ``orders``: documents that describe individual orders for products in a shop
- ``products``: documents that describe the products that a shop sells

An order must contain one product. The aggregation uses a
one-to-one join to match an order document to the corresponding product
document. The aggregation joins the collections by the ``ProductId`` field
that exists in documents in both collections.

First, create C# classes to model the data in the ``orders`` and ``products``
collections:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinOneToOne/Models.snippet.models.cs
   :language: csharp
   :copyable: true
   :category: usage example

To create the ``orders`` and ``products`` collections and insert the
sample data, add the following code to your application:

.. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinOneToOne/Tutorial.snippet.load-sample-data.cs
   :language: csharp
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Add a match stage for orders in 2020.

      First, start the aggregation on the ``orders`` collection and
      chain a :pipeline:`$match` stage that matches orders placed in 2020:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinOneToOne/Tutorial.snippet.match.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a lookup stage to link the collections.

      Next, add a :pipeline:`$lookup` stage. The
      ``$lookup`` stage joins the ``ProductId`` field in the ``orders``
      collection to the ``Id`` field in the ``products`` collection:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinOneToOne/Tutorial.snippet.lookup.cs
         :language: csharp
         :copyable: true
         :category: syntax example

   .. step:: Add a projection stage to create new document fields and omit unneeded fields.

      Next, add a :pipeline:`$project` stage to the pipeline.

      The ``$project`` stage creates two new fields, ``ProductName``
      and ``ProductCategory``, from the first entries of the respective
      values in the ``ProductMapping`` object field. The stage also
      specifies which fields to include and exclude from the output documents:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinOneToOne/Tutorial.snippet.project.cs
         :language: csharp
         :copyable: true
         :category: syntax example

      .. tip::

         Because this is a one-to-one join, the ``$lookup`` stage
         adds only one array element to the input document. The pipeline
         uses the :group:`$first` operator to retrieve the data from
         this element.

   .. step:: Run the aggregation and interpret the results.

      Finally, run the application in your IDE and inspect the results.

      The aggregated result contains three documents. The documents
      represent customer orders that occurred in 2020, with the
      ``ProductName`` and ``ProductCategory`` of the ordered product:

      .. literalinclude:: /code-examples/tested/csharp/driver/Aggregation/Pipelines/JoinOneToOne/TutorialOutput.txt
         :language: text
         :copyable: false
         :category: example return object

      The result consists of documents that contain fields from
      documents in the ``orders`` collection and the ``products``
      collection, joined by matching the ``ProductId`` field present in
      each original document.

.. end-tutorial
