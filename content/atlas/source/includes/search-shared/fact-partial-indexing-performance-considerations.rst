Highly complex view transformations can lead to slower performance when |service| reads
the view to filter and transform the source collection. In this scenario, consider
creating a :ref:`materialized view<manual-materialized-views>` to avoid additional
replication load on |service|. To avoid query latency caused by the view transformation,
you can query the source collection directly to retrieve the original documents.  

