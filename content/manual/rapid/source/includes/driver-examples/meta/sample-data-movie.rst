The C# examples on this page use the ``sample_mflix`` database
from the :atlas:`Atlas sample datasets </sample-data>`. To learn how to create a
free MongoDB Atlas cluster and load the sample datasets, see
:driver:`Get Started </csharp/current/quick-start/>` in the MongoDB .NET/C#
Driver documentation.

The following ``Movie`` class models the documents in the ``sample_mflix.movies``
collection:

.. literalinclude:: /includes/driver-examples/meta/Movie.cs
   :language: csharp

.. note:: ConventionPack for Pascal Case
   
   The properties in the preceding class are named in Pascal case, but the
   field names in the MongoDB collection use camel case. To account for this difference,
   you can use the following code to register a ``ConventionPack`` when your
   application starts:

   .. code-block:: csharp

      var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
      ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);