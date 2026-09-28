To allow the query engine to optimize queries, |and-or| handles
errors as follows:

- If any expression supplied to |and-or| would cause an error when
  evaluated alone, the |and-or| containing the expression may cause an
  error but an error is not guaranteed.

- An expression supplied after the first expression supplied to |and-or|
  may cause an error even if the first expression evaluates to
  |true-false|.
