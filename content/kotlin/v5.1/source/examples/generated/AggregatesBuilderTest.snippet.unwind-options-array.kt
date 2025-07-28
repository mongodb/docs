Aggregates.unwind(
    "\$${"lowestRatedTwoMovies"}",
    UnwindOptions().includeArrayIndex("position")
)
