`GraphRAG <https://microsoft.github.io/graphrag/>`__ 
is an alternative approach to traditional :ref:`RAG <avs-rag>`
that structures data as a knowledge graph of entities and their 
relationships instead of as vector embeddings. While vector-based RAG 
finds documents that are semantically similar to the query, GraphRAG
finds connected entities to the query and traverses the relationships 
in the graph to retrieve relevant information.

This approach is particularly useful for answering relationship-based 
questions like "What is the connection between Company A and Company B?" 
or "Who is Person X's manager?".

``MongoDBGraphStore`` is a component in the LangChain MongoDB integration
that allows you to implement GraphRAG by storing entities (nodes) 
and their relationships (edges) in a MongoDB collection. This component 
stores each entity as a document with relationship fields that 
reference other documents in your collection. It executes queries using 
the :pipeline:`$graphLookup` aggregation stage.