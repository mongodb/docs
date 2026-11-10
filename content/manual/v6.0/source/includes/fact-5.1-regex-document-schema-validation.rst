Starting in MongoDB 5.1, if a collection has 
:ref:`schema validation <schema-validation-query-expression>`
rules that contain invalid :query:`$regex options <$regex>` 
the server:

- Prevents all insert and update operations until the schema validation 
  rules containing the invalid regex pattern are modified with the 
  :dbcommand:`collMod` command.

- Writes a warning error to the :binary:`~bin.mongod` log file.
