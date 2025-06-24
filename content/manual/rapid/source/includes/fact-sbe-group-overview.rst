Starting in version 5.2, MongoDB uses the :ref:`slot-based execution
query engine <sbe-landing>` to execute :pipeline:`$group` stages
if either:

- ``$group`` is the first stage in the pipeline.

- All preceding stages in the pipeline can also be executed by the
  |sbe-short|.
  
