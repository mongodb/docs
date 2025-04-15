In |compass|, configure each of the following 
pipeline stages by selecting the stage from the dropdown and adding
the query for that stage. Click :guilabel:`Add Stage` to add 
additional stages.

.. include:: /includes/fts/sort/numbers-query.rst

If you enabled :guilabel:`Auto Preview`, |compass| displays the 
following documents next to the ``$limit`` pipeline stage:

.. code-block:: javascript
   :copyable: false

   [
     {
       title: '12 Years a Slave',
       awards: { wins: 267 }
     },
     {
       title: 'Gravity',
       awards: { wins: 231 }
     },
     {
       title: 'Gravity',
       awards: { wins: 231 }
     },
     {
       title: 'Birdman: Or (The Unexpected Virtue of Ignorance)',
       awards: { wins: 210 }
     },
     {
       title: 'Boyhood',
       awards: { wins: 185 }
     }
   ]
      