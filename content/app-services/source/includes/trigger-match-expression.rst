A :manual:`$match </reference/operator/aggregation/match>` expression document
that App Services uses to filter which change events cause the Trigger to
fire. The Trigger evaluates all change event objects that it receives against
this match expression and only executes if the expression evaluates to ``true``
for a given change event.

.. note:: Use Dot-Notation for Embedded Fields
   
   MongoDB performs a full equality match for embedded documents in a match
   expression. If you want to match a specific field in an embedded document,
   refer to the field directly using :manual:`dot-notation
   </core/document/#document-dot-notation>`. For more information, see
   :manual:`Query on Embedded Documents </tutorial/query-embedded-documents>` in
   the MongoDB server manual.

.. tip:: Performance Optimization

   Limit the number of fields that the Trigger processes by using a 
   **$match** expression.
   :ref:`Learn more. <database-triggers-match-expression>`
