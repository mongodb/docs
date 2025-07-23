# start-only
Band.where(members: 4).only(:name)
# end-only

# start-only-embed
bands = Band.only(:name, 'tours.year')
# end-only-embed

# start-only-embed-association
# Returns null
Band.where(name: 'Astral Projection').only(:name).first.managers

# Returns the first Manager object
Band.where(name: 'Astral Projection').only(:name, :manager_ids).first.managers
# end-only-embed-association

# start-without
Band.where(members: 4).without(:year)
# end-without

# start-limit
Band.limit(5)
# end-limit

# start-skip-limit
Band.skip(2).limit(5)
# Skips the first two results and returns
# the following five results
# end-skip-limit

# start-skip
Band.skip(3)

# Equivalent
Band.offset(3)
# end-skip

# start-batch
Band.batch_size(500)
# end-batch

# start-raw
Band.where(country: 'Argentina').raw
# end-raw

# start-raw-typed
Band.where(country: 'Argentina').raw(typed: true)
# end-raw-typed

# start-raw-false
# Retrieves raw results
results = Band.where(members: 4).raw

# ... Perform actions on results

# Returns instantiated model objects from raw results
bands = results.raw(false).to_a
# end-raw-false
