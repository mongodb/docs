.. step:: Verify the health of the ``mongot`` process.

   To verify, send a request by using a |http| client or ``curl`` to the
   ``/health`` endpoint. For example, send a ``curl`` request similar to
   the following sample request: 

   .. code-block:: shell 

      curl localhost:8080/health

   The endpoint returns one of the following in the response: 

   - ``SERVING``, if the ``mongot`` process is running

     ``mongot`` might not serve queries as it doesn't check the status
     of the indexes, which must be in ``Ready`` state to serve queries. 

   - ``NOT_SERVING``, if the ``mongot`` process isn't running
