.. eval-command-example

.. code-block:: javascript

   db.runCommand( {
         eval: function(name, incAmount) {
                  var doc = db.myCollection.findOne( { name : name } );

                  doc = doc || { name : name , num : 0 , total : 0 , avg : 0 };

                  doc.num++;
                  doc.total += incAmount;
                  doc.avg = doc.total / doc.num;

                  db.myCollection.save( doc );
                  return doc;
               },
         args: [ "eliot", 5 ]
      }
   );

.. eval-method-example

.. code-block:: javascript

   db.eval( function(name, incAmount) {
               var doc = db.myCollection.findOne( { name : name } );

               doc = doc || { name : name , num : 0 , total : 0 , avg : 0 };

               doc.num++;
               doc.total += incAmount;
               doc.avg = doc.total / doc.num;

               db.myCollection.save( doc );
               return doc;
            },
            "eliot", 5 );
