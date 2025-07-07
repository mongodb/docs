.. note:: ConventionPack for Pascal Case
   
   The C# classes on this page use Pascal case for their property names, but the
   field names in the MongoDB collection use camel case. To account for this difference,
   you can use the following code to register a ``ConventionPack`` when your
   application starts:

   .. code-block:: csharp

      var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
      ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);