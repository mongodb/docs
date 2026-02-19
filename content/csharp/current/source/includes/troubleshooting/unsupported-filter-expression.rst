.. _csharp-faq-unsupported-expressions:

``Unsupported filter`` or ``Expression not supported``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you use a LINQ or builder expression that isn't available in the Query API,
you might receive an ``Unsupported filter ...`` or ``Expression not
supported ...`` exception message.
An expression might not be available in the following cases:

1. You are attempting to use a {+lang-framework+} feature that doesn't have an
   equivalent MongoDB representation. For example, {+lang-framework+} and MongoDB have
   different semantics around collations.
#. The driver doesn't support a particular transformation from the LINQ or
   builder expression into the Query API. This might happen because the
   provided query has no Query API translation or because a feature hasn't been
   implemented in the driver.

If you receive one of these exceptions, try the following steps:

1. Use the `{+analyzer+}
   <https://www.mongodb.com/docs/mongodb-analyzer/current/>`__ to analyze your
   expressions.
#. Simplify your query where possible.
#. Provide a query as a ``BsonDocument`` object or JSON string. All
   definition classes, such as ``FilterDefinition``,
   ``ProjectionDefinition``, and ``PipelineDefinition``, support implicit
   conversion from ``BsonDocument`` objects or JSON strings. For example, the
   following filters are equivalent when used in a query or
   aggregation:

   .. code-block:: csharp

      FilterDefinition<Entity> typedFilter = Builders<Entity>.Filter.Eq(e => e.A, 1);
      FilterDefinition<Entity> bsonFilter = new BsonDocument {{ "a", 1 }};
      FilterDefinition<Entity> jsonFilter = "{ a : 1 }";

You can combine ``BsonDocument`` objects, JSON strings, POCOs in the same
query, as shown in the following example:

.. code-block:: csharp

   FilterDefinition<Entity> filter = Builders<Entity>.Filter
       .And(Builders<Entity>.Filter
           .Eq(e => e.A, 1), BsonDocument
           .Parse("{ b : 2 }"));

.. note::

   If you use a ``BsonDocument`` object or JSON string, your field names must match
   the case-sensitive names stored by the server. For example, when referencing
   the ``_id`` field, you must refer to it by using the field name ``_id``.
   
   Because the Query API doesn't recognize
   :ref:`manual class mappings <csharp-class-mapping>`,
   BSON serialization attributes, or serialization conventions, you can't use these
   mechanisms to change field names. For example, if a document contains a field named
   ``FirstName`` annotated with ``[BsonElement("first_name")]``, you must refer to it 
   as ``first_name`` in ``BsonDocument`` or JSON string definitions.
   
