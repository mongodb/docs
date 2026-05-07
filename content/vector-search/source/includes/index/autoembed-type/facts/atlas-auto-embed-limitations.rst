For {+avs+} indexes using Automated Embedding, you must enable 
auto-scaling for dedicated clusters. 

After creating the index, you can't edit certain fields in the 
``autoEmbed`` type index definition. Specifically, you can't edit 
the ``path``, ``model``, ``quantization``, and ``numDimensions`` 
fields in the index definition. However, you can edit or add ``filter`` 
type fields. If you need to change the index configuration for the 
``autoEmbed`` type fields, you must create a new index with your 
desired configuration and then delete the old index.

You can't configure both ``vector`` and ``autoEmbed`` type fields in 
the same index definition. {+avs+} throws an exception if you 
define fields of both types in the same index.

On sharded clusters, when you create an ``autoEmbed`` type index, 
there are some additional costs and performance implications: 

- When adding or removing shards or during routine data migration triggered 
  by the cluster balancer, additional embeddings are created for the 
  documents that are moved between shards. This can increase the cost 
  of embedding generation.
- When querying, each shard generates embeddings independently for the 
  same query text. This can increase the cost of embedding generation.  

The embedding model inference runs on a multi-tenant service 
in the {+service+} Data Plane, available in MongoDB's |gcp| based 
infrastructure in a US region. This means that your data is sent to 
MongoDB's inference infrastructure for embedding generation and retrieval, 
regardless of your cluster's cloud provider. Data transfer costs apply.

.. include:: /includes/index/shared/fact-fts-cluster-tier-limitations.rst

.. include:: /includes/shared/facts/fact-search-index-limit.rst