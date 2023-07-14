The query includes a:

- :pipeline:`$limit` stage to limit the output to 5 results.
 
- :pipeline:`$project` stage to:

  - return the document's score.
 
  - exclude all fields except ``title``.
   
  - add a new field called ``highlights``, which contains highlighting 
    information.
