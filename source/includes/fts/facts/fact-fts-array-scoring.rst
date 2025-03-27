When you query values in arrays, |fts| doesn't alter the score of the
matching results based on the number of values inside the array that
matched the query. The score would be the same as a single match
regardless of the number of matches inside an array. 
