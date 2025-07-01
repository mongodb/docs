The following sample application:

- Establishes a connection to your Atlas cluster.
- Inserts documents into a collection called ``people`` 
  in the ``gettingStarted`` database.
- Searches the ``people`` collection for documents that have a 
  ``name.last`` value of ``Turing`` and returns the document.

Create a file called ``insert-data.js`` and copy the following 
code into the file:

.. note::

   Replace the placeholder with your |service| connection
   string.

.. literalinclude:: /includes/insert-data.js
   :language: javascript
   :linenos:
   :emphasize-lines: 5

To run the sample application, use the following command:

.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: shell

      node insert-data.js

   .. output::
      :language: json

      Document found:
      {"_id":"65c296ae128a3f34abda47e0","name":{"first":"Alan","last":"Turing"},"birth":"1912-06-23T06:00:00.000Z","death":"1954-06-07T05:00:00.000Z","contribs":["Turing machine","Turing test","Turingery"],"views":1250000}

.. note::

    You might see a different value for
    :manual:`ObjectId </reference/bson-types/#objectid>`,
    because it is a system-generated value.

.. tip::

   To learn more about querying data with Node.js, see
   the :driver:`Node.js documentation </node/>`.
