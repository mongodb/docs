The sample query defines the following variables:

- ``vectorWeight`` to add weight to the vector search score, with a
  lower number providing higher weight.
- ``vectorCutoff`` to set the minimum vector score for result to be
  boosted.
- ``numResults`` to specify the desired number of search results
- ``numCandidates`` to calculate the number of candidates to consider
  during the initial search. It calculates the number of candidates by
  using the following formula:

  .. code-block:: shell
     :copyable: false

     numCandidates = numResults x overRequestFactor
