``$expr`` can contain expressions that compare fields from the same
document.

The following operation uses :query:`$expr` to find documents in the
``movies`` collection where the Rotten Tomatoes viewer rating exceeds
the critic rating:

.. io-code-block::
   :copyable: true

   .. input:: /code-examples/tested/command-line/mongosh/aggregation/expressions/expr/find.snippet.expr-find-viewer-gt-critic.js
      :language: javascript
      :category: usage example

   .. output:: /code-examples/tested/command-line/mongosh/aggregation/expressions/expr/find-output.js
      :language: javascript

