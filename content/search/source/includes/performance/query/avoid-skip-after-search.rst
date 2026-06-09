Using :pipeline:`$skip` and :pipeline:`$limit` to retrieve results
non-sequentially might be slow if the results for your query are large. 
For optimal performance, use the :pipeline:`$search` ``searchAfter`` or
``searchBefore`` options to paginate results. To learn more, see 
:ref:`fts-paginate-results`. 

To return non-sequential results, such as jumping from page 2 to page 5,
you can use the following pipeline stages: 

- :pipeline:`$search` ``searchAfter`` the last result on Page 2
- :pipeline:`$skip` documents on Pages 3 and 4 
- :pipeline:`$limit` results for Page 5

Here, your query is optimized to skip only 2 pages of results, instead
of skipping 4 pages if you didn't use ``searchAfter``. For a
demonstration of this, see :ref:`fts-paginate-results`.