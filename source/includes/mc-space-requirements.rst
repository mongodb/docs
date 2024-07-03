Ensure the shard you are moving the collection to has enough storage 
space for the collection and its indexes. The destination shard requires 
at least ``( Collection size + Index Size ) * 1.2`` bytes available. 
This extra space helps accomodate incoming writes during the 
``moveCollection`` operation.
