Starting in MongoDB 5.2, MongoDB uses the
:ref:`slot-based execution query engine <5.1-rel-notes-sbe>` to execute
:pipeline:`$group` stages when :pipeline:`$group` is either:

- The first stage in the pipeline.

- Part of a series of stages executed by the |sbe-short| that
  occurs at the beginning of the pipeline. For example, if a pipeline
  begins with :pipeline:`$match` followed by :pipeline:`$group`, the
  :pipeline:`$match` and :pipeline:`$group` stages are executed by the
  |sbe-short|.
  
In most cases, the |sbe-short| provides improved performance and lower
CPU and memory costs compared to the classic query engine.
