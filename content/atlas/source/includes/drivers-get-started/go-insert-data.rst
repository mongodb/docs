The following sample application:

- Establishes a connection to your Atlas cluster.
- Inserts documents into a collection called ``people`` 
  in the ``gettingStarted`` database.
- Searches the ``people`` collection for documents that have a 
  ``name.last`` value of ``Turing`` and returns the document.

In your Go project with the driver and dependencies 
installed, create a file called ``insert-data.go`` and copy 
the following code into the file:

.. note::

   Replace the placeholder with your |service| connection
   string.

.. literalinclude:: /includes/insert-data.go
   :language: go
   :linenos:
   :emphasize-lines: 30

To run the sample application, use the following command:

.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: shell

      go run insert-data.go

   .. output::
      :language: json

      Document Found:
      {Name:{First:Alan Last:Turing} Birth:1912-05-23 00:00:00 +0000 UTC Death:1954-05-07 00:00:00 +0000 UTC Contribs:[Turing machine Turing test Turingery] Views:1250000}

.. note::

   You might see a different value for
   :manual:`ObjectId </reference/bson-types/#objectid>`,
   because it is a system-generated value.
     
.. tip::

   To learn more about querying data with Go, see
   the :driver:`Go documentation </go/>`.
