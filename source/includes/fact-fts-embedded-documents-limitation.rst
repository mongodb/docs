|fts| doesn't support indexing more than approximately two billion 
index objects, where each indexed embedded document counts as a single 
object against this hard limit. Using ``embeddedDocuments`` type could 
result in indexing objects in excess of this limit, which will cause 
an index to transition to a failed state. If you have large arrays that 
might generate two billion objects, we recommend sharding clusters that 
contain indexes with ``embeddedDocuments`` field type.
