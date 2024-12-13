- The query converter uses AI technology which may not be able to 
  convert long or complex queries, triggers, packages, or stored 
  procedures. Some queries may not be converted correctly while 
  others may not be converted at all. For more information, see
  :ref:`<rm-ai-and-data-usage>`.

- The query converter uses the relational schema, the MongoDB schema,  
  and the mapping rules in your current project to determine how the 
  queries should be converted. Conversions may fail or be incorrect if 
  the queries reference tables that are not in your relational schema
  or if they are not mapped to MongoDB collections.

- Converted queries, triggers, views, packages, and stored procedures 
  are saved in your project and persist through project import and 
  exports.

- SQL queries are limited to 40,000 text characters.
