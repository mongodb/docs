The following sample application:

- Imports ``mongodb`` packages and dependencies.
- Establishes a connection to your Atlas cluster.
- Inserts documents into a collection called ``people`` 
  in the ``gettingStarted`` database.
- Searches the ``people`` collection for documents that have a 
  ``name.last`` value of ``Turing`` and returns the document.

In your Java project with the driver and dependencies 
installed, create a file called ``InsertData.java`` and copy 
the following code into the file:

.. note::

   Replace the placeholder with your |service| connection
   string.

.. literalinclude:: /includes/insert-data.java
   :language: java
   :linenos:
   :emphasize-lines: 19

Then, compile and run the SortDateForSpeed.java file:

.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: shell

      javac InsertData.java
      java InsertData

   .. output::
      :language: json

      Document found:
      {"_id": {"$oid": "64d52c3c3db2144fc00791b9"}, "name": {"first": "Alan", "last": "Turing"}, "birth": {"$date": {"$numberLong": "-1815328800000"}}, "death": {"$date": {"$numberLong": "-491338800000"}}, "contribs": ["Turing machine", "Turing test", "Turingery"], "views": 1250000}

.. note::

    You might see a different value for
    :manual:`ObjectId </reference/bson-types/#objectid>`,
    because it is a system-generated value.
    
.. tip::

   To learn more about querying data with Java, see
   the :driver:`Java documentation </java/>`.
