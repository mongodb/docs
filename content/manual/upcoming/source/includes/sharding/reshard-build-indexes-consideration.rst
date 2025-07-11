Index builds that occur during resharding might silently
fail.

- Do not create indexes during the resharding process.

- Do not start the resharding process if there are ongoing index builds.

If the collection you're resharding uses :atlas:`Atlas Search
</atlas-search>`, the search index becomes unavailable when the
resharding operation completes. You need to manually rebuild the
search index once the resharding operation completes.
