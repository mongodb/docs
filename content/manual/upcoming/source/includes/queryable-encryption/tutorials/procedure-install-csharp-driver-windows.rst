.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the :driver:`.NET/C# </csharp>` driver, install version 2.20.0 or later.
         
   .. step:: For driver versions 3.0 or later, install the ``MongoDB.Driver.Encryption`` package
      
      Install the `MongoDB.Driver.Encryption <https://www.nuget.org/packages/MongoDB.Driver.Encryption>`__ 
      package from NuGet. This package enables automatic encryption. 
   
   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      Start an :atlas:`Atlas Cluster </getting-started>` or a :ref:`MongoDB
      Enterprise instance <manage-mongodb-processes>`.