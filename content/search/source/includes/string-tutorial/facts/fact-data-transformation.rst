This code uses the following aggregation pipeline stages to transform
the data as described:

- :pipeline:`$project`:

  - Converts the date objects in the ``last_scraped`` field
    into string objects in the ``YYYY-MM-DD`` format using
    :expression:`$dateToString` and writes the output to a string
    field called ``lastScrapedDate``.
  - Converts the number objects in the ``accommodates`` and
    ``minimum_nights`` fields into string values using
    :expression:`$toString` and writes the output to number fields
    called ``accommodatesNumber`` and ``minimumNumberOfNights``,
    respectively. 
  - Includes the ``name`` and ``property_type`` string fields in
    the output and renames them to ``propertyName`` and
    ``propertyType`` respectively.

- :pipeline:`$merge`: 
  
  Writes the output fields from the
  :pipeline:`$project` stage to a materialized view named
  ``airbnb_mat_view`` in the ``sample_airbnb`` database.