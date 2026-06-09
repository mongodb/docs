.. _perf-ref-stored-source:

Storing Source Fields 
~~~~~~~~~~~~~~~~~~~~~

You can :ref:`configure <fts-stored-source-definition>` fields to 
store on |fts| and improve performance of subsequent aggregation 
pipeline stages like :pipeline:`$sort`, :pipeline:`$match`, 
:pipeline:`$group`, and :pipeline:`$skip`. Use this optimization if 
your original documents and matched dataset are so large that a full 
data lookup is inefficient. To learn more about storing specific fields 
on |fts| and returning those stored fields only, see 
:ref:`fts-stored-source-definition` and 
:ref:`fts-return-stored-source-option`.

We recommend storing only the minimum number of fields required for 
subsequent stages. If necessary, you can use :pipeline:`$lookup` at 
the end of the pipeline stage to retrieve entire documents as shown in 
the :ref:`fts-return-stored-source-egs`. Storing unnecessary fields 
increases disk utilization and could negatively impact performance 
during indexing and querying.