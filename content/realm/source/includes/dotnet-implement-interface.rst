.. important:: Inheritance

   All Realm objects inherit from the 
   :dotnet-sdk:`IRealmObject <reference/Realms.IRealmObject.html>`, 
   :dotnet-sdk:`IEmbeddedObject <reference/Realms.IEmbeddedObject.html>`, or 
   :dotnet-sdk:`IAsymmetricObject <reference/Realms.IAsymmetricObject.html>`
   interface and must be declared ``partial`` classes.

   In versions of the .NET SDK older than 10.18.0, objects derive from 
   :dotnet-sdk:`RealmObject <reference/Realms.RealmObject.html>`, 
   :dotnet-sdk:`EmbeddedObject <reference/Realms.EmbeddedObject.html>`, or 
   :dotnet-sdk:`AsymmetricObject <reference/Realms.AsymmetricObject.html>`
   base classes. This approach to Realm model definition is still supported, but 
   does not include new features such as the :ref:`nullability annotations 
   <dotnet-required-optional-property>`. In a future SDK release, the 
   base classes will become deprecated. You should use the interfaces for any 
   new classes that you write and should consider migrating your existing 
   classes.