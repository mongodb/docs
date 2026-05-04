Starting in MongoDB 8.2, resharding operations ignore the
``numInitialChunks`` setting when the shard key contains a hashed
prefix. Instead, MongoDB deterministically splits the hashed key space
among recipients, using the same approach as initial chunk creation for
empty hashed collections.
