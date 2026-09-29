The Performance Advisor displays sample queries with recommended 
indexes. Each sample query includes a query inefficiency score, which is
how many documents were read for every document returned by the query.
A score of 1 represents a very efficient query because every document read matched
the query and was returned with the query results. The Performance Advisor
displays a warning icon next to any score over 1,000, which represent 
highly inefficient queries. All suggested indexes represent an opportunity
to improve query performance.