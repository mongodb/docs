Starting in MongoDB 9.0, if an indexed field becomes a multikey field while a 
query that references the field is running, the query might fail with a 
``QueryKilledError``. An indexed field becomes multikey when you insert or 
update a document so the field contains an array value.

If your query fails with this error, re-run the query after the insert or 
update operation completes.
