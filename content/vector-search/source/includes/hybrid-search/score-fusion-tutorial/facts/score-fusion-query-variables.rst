The sample query applies weights to the normalized input pipeline
scores when combining the results. It applies the weights using a
custom aggregation expression. In this example, the query uses the ``$multiply`` expression to multiply the score from the ``searchOne`` pipeline by ``10``. This ensures that results from this pipeline contribute more to the final score than results from the ``searchTwo`` pipeline. It then uses the ``$sum``
aggregation operator to add the scores from the two pipeline stages.

.. code-block:: shell 
   :copyable: false

   Final Score = ($$searchOne * 10) + $$searchTwo

.. note::

   If you combine the query results using an expression
   (``combination.method``: ``expression``), you can't use weight in your
   query. We recommend using ``$multiply`` as demonstrated in the
   preceding sample query.
