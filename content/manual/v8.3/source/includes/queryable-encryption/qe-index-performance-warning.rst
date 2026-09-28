Do not create indexes on encrypted fields. Creating indexes on
encrypted fields that use {+qe+} negatively affect performance. Instead, you can 
create an index on the ``__safeContent__`` field to support queries on encrypted 
fields.
