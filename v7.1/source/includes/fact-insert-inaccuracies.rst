Even if you encounter a server error during an insert, some documents 
may have been inserted. 

After a successful insert, the system returns |writeResult|, the number 
of documents inserted into the collection. If the insert 
operation is interrupted by a replica set state change,
the system may continue inserting documents. As a result,
|writeResult| may report fewer documents than actually inserted.