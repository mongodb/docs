The following sample application:

- Imports ``mongodb`` packages and dependencies.
- Establishes a connection to your Atlas cluster.
- Inserts documents into a collection called ``people`` 
  in the ``gettingStarted`` database.
- Searches the ``people`` collection for documents that have a 
  ``name.last`` value of ``Turing`` and returns the document.

In your .NET/C# project with the driver and dependencies 
installed, copy the following code into the ``Program.cs`` 
file:

.. note::

   Replace the placeholder with your |service| connection
   string.

.. literalinclude:: /includes/insert-data.cs
   :language: csharp
   :linenos:
   :emphasize-lines: 9

To run the sample application, use the following command:

.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: shell

      dotnet run Program.cs

   .. output::
      :language: json

      Document found:
      { "_id" : ObjectId("65c28fcf87156efe024c4558"), "Name" : { "First" : "Alan", "Last" : "Turing" }, "Birth" : ISODate("1912-05-23T06:00:00Z"), "Death" : ISODate("1954-05-07T05:00:00Z"), "Contribs" : ["Turing machine", "Turing test", "Turingery"], "Views" : 1250000 }

.. note::

    You might see a different value for
    :manual:`ObjectId </reference/bson-types/#objectid>`,
    because it is a system-generated value.
    
.. tip::

   To learn more about querying data with C#, see
   the :driver:`C# documentation </csharp/>`.
