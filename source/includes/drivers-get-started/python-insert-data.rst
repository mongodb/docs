   
.. include:: /includes/steps/gswa-driver-insert.rst

Once you've successfully inserted a document into
your |service| cluster through the PyMongo driver, 
read the data by using the PyMongo ``find_one()`` method.
   
The following command returns one document from the 
``people`` collection that has a ``name.last`` value 
of ``Turing``:

.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: shell
      :linenos: 

      people.find_one({ "name.last": "Turing" })
         
   .. output::
      :language: json 

      { 
         '_id': ObjectId('5ecd43aa2600f51da704b35f'), 
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
   