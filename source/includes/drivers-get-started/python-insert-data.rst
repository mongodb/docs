The following sample application:

- Establishes a connection to your Atlas cluster.
- Inserts documents into a collection called ``people`` 
  in the ``gettingStarted`` database.
- Searches the ``people`` collection for documents that have a 
  ``name.last`` value of ``Turing`` and returns the document.

In your Python project with the driver and dependencies 
installed, create a file called ``insert-data.py`` and copy 
the following code into the file:

.. note::

   Replace the placeholder with your |service| connection
   string.

.. literalinclude:: /includes/insert-data.py
   :language: python
   :linenos:
   :emphasize-lines: 5

To run the sample application, use the following command:

.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: shell
      :linenos: 

      python insert-data.py
         
   .. output::
      :language: json 

      Document found:
      { 
         '_id': ObjectId('65c2a8188388383b00a85b1f'), 
         'name': { 
            'first': 'Alan', 
            'last': 'Turing' 
         }, 
         'birth': datetime.datetime(1912, 6, 23, 0, 0), 
         'death': datetime.datetime(1954, 6, 7, 0, 0), 
         'contribs': [
            'Turing machine', 
            'Turing test', 
            'Turingery'
         ], 
         'views': 1250000 
      }

.. note::
   
   You might see a different value for
   :manual:`ObjectId </reference/bson-types/#objectid>`,
   because it is a system-generated value.
   
.. tip::
   
   To learn more about querying data with PyMongo, see
   the :driver:`PyMongo documentation </python/>`.
   