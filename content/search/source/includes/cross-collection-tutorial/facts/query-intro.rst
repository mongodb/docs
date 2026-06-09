The following query uses the following stages:
      
- :pipeline:`$lookup` to do the following: 

  - Join ``customers`` and ``accounts`` collections in the 
    ``sample_analytics`` database based on the account ID of the 
    customers and return the matching documents from the 
    ``accounts`` collection in an array field named 
    ``purchases``.
  - Use :pipeline:`$search` stage in the sub-pipeline to search 
    for customer accounts that ``must`` have purchased both 
    ``CurrencyService`` and ``InvestmentStock`` with preference 
    for an order limit between ``5000`` to ``10000``.

- :pipeline:`$limit` stage to limit the output to ``5`` results.

- :pipeline:`$project` stage to exclude the specified fields in 
  the results.