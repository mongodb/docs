A collection ``students`` has the following document:

.. code-block:: javascript

   {
      "_id" : 5,
      "quizzes" : [
         { "wk": 1, "score" : 10 },
         { "wk": 2, "score" : 8 },
         { "wk": 3, "score" : 5 },
         { "wk": 4, "score" : 6 }
      ]
   }

The following :update:`$push` operation uses:

- the :update:`$each` modifier to add multiple documents to the
  ``quizzes`` array,

- the :update:`$sort` modifier to sort all the elements of the
  modified ``quizzes`` array by the ``score`` field in descending
  order, and

- the :update:`$slice` modifier to keep only the **first** three
  sorted elements of the ``quizzes`` array.

.. code-block:: javascript

   db.students.update(
      { _id: 5 },
      {
        $push: { 
          quizzes: { 
             $each: [ { wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 } ],
             $sort: { score: -1 },
             $slice: 3
          }
        }
      }
   )

The result of the operation is keep only the three highest scoring quizzes:

.. code-block:: javascript

   {
     "_id" : 5,
     "quizzes" : [
        { "wk" : 1, "score" : 10 },
        { "wk" : 2, "score" : 8 },
        { "wk" : 5, "score" : 8 }
     ]
   }
