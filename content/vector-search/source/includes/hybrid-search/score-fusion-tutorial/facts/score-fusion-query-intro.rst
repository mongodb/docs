The sample query retrieves the scored search results from the
semantic and full-text searches and applies the ``sigmoid`` expression
to normalize the score before combining the results. It then combines
the score from the pipelines into a single aggregated score for each
document. 
