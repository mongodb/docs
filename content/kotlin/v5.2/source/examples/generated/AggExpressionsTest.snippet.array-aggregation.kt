val showtimes = current().getArray<MqlDocument>("showtimes")

listOf(
    Aggregates.project(
        Projections.fields(
            Projections.computed("availableShowtimes", showtimes
                .filter { showtime ->
                    val seats = showtime.getArray<MqlInteger>("seats")
                    val totalSeats = seats.sum { n -> n }
                    val ticketsBought = showtime.getInteger("ticketsBought")
                    val isAvailable = ticketsBought.lt(totalSeats)
                    isAvailable
                })
)))
