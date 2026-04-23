The following query searches the ``plot_embedding_voyage_3_large`` field using the 
vector embeddings for the string *star wars*. It specifies aggregation pipeline and
comparison query operators to demonstrate a combined use of the
operators to filter the data. 

The filter uses the :query:`$or` aggregation pipeline operator to find
movie documents that match either one of the following criteria: 

- Filter by the ``genres`` field to find movies that aren't in the
  ``crime`` genre.
- Filter by the ``year`` field to find movies that were released in or
  before the year ``2015`` *and* by the ``genres`` field to find
  movies in the ``action`` genre.
