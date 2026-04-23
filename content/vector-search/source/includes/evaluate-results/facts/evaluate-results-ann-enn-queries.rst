The top nine documents in the example |enn| and |ann| query results
are the same and have the same score. This shows a high-level of
similarity in the top results for the query. However, the tenth
document in the |enn| and |ann| query results is different, which
reflects a slight variation in the exact and approximate nearest
neighbor search.  

|enn| search examines all possible candidates and returns the
closest match to the query based on the similarity score. |ann| search
uses approximations to speed up the search, which might alter the
score of the documents. If you increase the ``numCandidates`` value in
the |ann| query, the results will be a closer match to the |enn|
query results. However, this would consume additional computational
resources and might reduce query speed. The tenth document in the
results reflects the trade-off between accuracy and speed. 

After quantitatively evaluating results against the |enn| ground
truth, we recommend testing a set of 100 queries in the same manner
and computing the "jaccard similarity" between the result sets.
Jaccard similarity can be computed by dividing the intersection
between two sets, that is, the overlapping items, by the total set
size. This gives a sense for recall performance of |ann| queries,
including those performed against quantized vectors. 

If you notice large discrepancies between your |enn| and |ann| query
results, we recommend tuning the ``numCandidates`` value to strike an 
ideal balance between accuracy and speed for your application. 

We recommend that you use judgement lists for a structured list of queries
with their ideal results for the |ann| query or |enn| ground truth
values. You can use the |enn| query results as the baseline
judgement list and then evaluate |ann| query results against this
judgement list to measure recall, overlap, and performance. Judgment
lists provide a way to evaluate whether |ann| queries meet the desired
accuracy or recall thresholds compared to the |enn| baseline. Use LLMs
to generate the example queries.
