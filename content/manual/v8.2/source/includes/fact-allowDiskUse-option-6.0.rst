Use this option to override :parameter:`allowDiskUseByDefault` 
for a specific query. You can use this option to either:

- Prohibit disk use on a system where disk use is allowed by 
  default.
- Allow disk use on a system where disk use is prohibited by 
  default.

Starting in MongoDB 6.0, if :parameter:`allowDiskUseByDefault` is set 
to ``true`` and the server requires more than 100 megabytes of memory 
for a pipeline execution stage, MongoDB automatically writes 
temporary files to disk unless the query specifies 
``{ allowDiskUse: false }``.

For details, see :parameter:`allowDiskUseByDefault`.
