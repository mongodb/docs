Scaling your cluster by adding search nodes or by changing the search
tier triggers a rebuild of the full |fts| index. However, if your cluster 
on |aws| or |azure| has dedicated search nodes for which you haven't 
enabled :ref:`security-kms-encryption`, |service| provides the following
optimizations: 

- When you scale your search nodes, |service| uses a recent copy of
  your index in |s3| or {+az-bs+} instead of rebuilding the entire 
  |fts| index on the new node. 
- For existing nodes, |service| periodically takes and uploads a new
  incremental list of index files. |service| retains index files for up
  to fourteen (14) days. 
  
This is not yet available for clusters with dedicated search nodes on
|gcp|.  