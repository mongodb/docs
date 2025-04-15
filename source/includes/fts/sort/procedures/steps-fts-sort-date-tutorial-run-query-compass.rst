In |compass|, configure each of the following 
pipeline stages by selecting the stage from the dropdown and adding
the query for that stage. Click :guilabel:`Add Stage` to add 
additional stages.

.. include:: /includes/fts/sort/date-tutorial.rst

If you enabled :guilabel:`Auto Preview`, |compass| displays the 
following documents next to the ``$limit`` pipeline stage:

.. code-block:: javascript
   :copyable: false

   {
     title: 'Summer Nights',
     released: 2015-01-28T00:00:00.000+00:00,
     score: 0.348105788230896
   },
   {
     title: 'Summertime',
     released: 2014-08-01T00:00:00.000+00:00,
     score: 0.5917375683784485
   },
   {
     title: 'Summer of Blood',
     released: 2014-04-17T00:00:00.000+00:00,
     score: 0.9934720396995544
   },
   {
     title: 'Summer Games',
     released: 2012-02-08T00:00:00.000+00:00,
     score: 0.15982933342456818
   },
   {
     title: 'Summer of Goliath',
     released: 2011-07-08T00:00:00.000+00:00,
     score: 0.13038821518421173
   }

