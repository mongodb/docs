Optimal :term:`recall` for |ann| search is typically considered to
be around 90-95% overlap in results with |enn| search but 
with significantly lower latency. This provides a good balance 
between accuracy and performance. To achieve this with {+avs+},
:ref:`tune <avs-num-candidates>` the ``numCandidates`` parameter 
at query time.
