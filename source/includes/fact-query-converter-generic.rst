- The query converter uses :abbr:`AI (Artificial Intelligence)` 
  technology which may not be able to convert long or complex queries,
  triggers, or stored procedures. Some queries may not be converted 
  correctly while others may not be converted at all.

- The query converter uses the relational schema, the MongoDB schema,  
  and the mapping rules in your current project to determine how the 
  queries should be converted. Conversions may fail or be incorrect if 
  the queries reference tables that are not in your relational schema
  or if they are not mapped to MongoDB collections.

- Converted queries, triggers, views, and stored procedures are saved in 
  your project and persist through project import and exports.

- SQL queries are limited to 10,000 text characters.