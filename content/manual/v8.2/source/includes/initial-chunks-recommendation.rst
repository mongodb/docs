If you see the error "The shard key provided does not have enough
cardinality to make the required number of chunks", reshard the
collection with a lower ``numInitialChunks`` value.
