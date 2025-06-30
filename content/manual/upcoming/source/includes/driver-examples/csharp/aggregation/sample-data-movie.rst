The C# examples on this page use the ``sample_mflix`` database
from the :atlas:`Atlas sample datasets </sample-data>`. To learn how to create a
free MongoDB Atlas cluster and load the sample datasets, see
:driver:`Get Started </csharp/current/quick-start/>` in the MongoDB .NET/C#
Driver documentation.

The following ``Movie`` class models the documents in the ``sample_mflix.movies``
collection:

.. literalinclude:: /includes/driver-examples/csharp/aggregation/Movie.cs
   :language: csharp

.. include:: /includes/driver-examples/csharp/convention-pack-note.rst