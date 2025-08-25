.. code-block:: csharp

   var realm = Realm.GetInstance();
   Console.WriteLine($"Realm is located at: {realm.Config.DatabasePath}");