Starting in MongoDB 6.0, pipeline stages that require more than 100 
megabytes of memory to execute write temporary files to disk by 
default. These temporary files last for the duration of the pipeline 
execution and can influence storage space on your instance. In earlier 
versions of MongoDB, you must pass  ``{ allowDiskUse: true }`` to 
individual ``find`` and ``aggregate`` commands to enable this 
behavior.

Individual ``find`` and ``aggregate`` commands can override the 
:parameter:`allowDiskUseByDefault` parameter by either:

- Using ``{ allowDiskUse: true }`` to allow writing temporary files out 
  to disk when ``allowDiskUseByDefault`` is set to ``false``

- Using ``{ allowDiskUse: false }`` to prohibit writing temporary files
  out to disk when ``allowDiskUseByDefault`` is set to ``true``
