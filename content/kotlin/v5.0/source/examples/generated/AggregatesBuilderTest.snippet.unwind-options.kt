Aggregates.unwind(
    "\$${"lowestRatedTwoMovies"}",
    UnwindOptions().preserveNullAndEmptyArrays(true)
)
