Index builds that occur during resharding might silently
fail.

- Do not create indexes during the resharding process.

- Do not start the resharding process if there are ongoing index builds.
