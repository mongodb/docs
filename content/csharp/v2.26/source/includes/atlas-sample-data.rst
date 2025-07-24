Sample Data
~~~~~~~~~~~

The examples in this guide use the ``restaurants`` collection
from the ``sample_restaurants`` database. The documents in this
collection use the following ``Restaurant``, ``Address``, and ``GradeEntry`` 
classes as models:

.. literalinclude:: /includes/code-examples/Restaurant.cs
   :language: csharp
   :copyable:
   :dedent:

.. literalinclude:: /includes/code-examples/Address.cs
   :language: csharp
   :copyable:
   :dedent:

.. literalinclude:: /includes/code-examples/GradeEntry.cs
   :language: csharp
   :copyable:
   :dedent:

.. include:: /includes/convention-pack-note.rst

This collection is from the :atlas:`sample datasets </sample-data>` provided
by Atlas. See the :ref:`<csharp-quickstart>` to learn how to create a free MongoDB cluster
and load this sample data.