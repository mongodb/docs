The sample query defines the following weights to the pipelines to
influence that pipeline's rank contribution to the final score: 

- ``vectorPipeline`` = 0.5
- ``fullTextPipeline`` = 0.5

You can adjust the weights to give more importance to one method of
search. Note that a lower number provides higher weight. 

The weighted reciprocal rank score is calculated by using the
following formula:

.. code-block:: 
   :copyable: false 

   weight x reciprocal rank 

The ``scoreDetails.details.value`` shows the raw score from that pipeline
before it is weighted and combined by using reciprocal rank fusion.
The ``scoreDetails.value`` shows the weighted reciprocal rank score.  
