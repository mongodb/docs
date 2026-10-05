db.movieReviews.insertMany( [
   {
      title: "Galactic Odyssey",
      source: "filmCritic",
      data: { rating: 8.1, votes: 1482903 }
   },
   {
      title: "Galactic Odyssey",
      source: "viewerVault",
      data: { tomatometer: 79, audienceScore: 85 }
   },
   {
      title: "Neon Horizon",
      source: "filmCritic",
      data: { rating: 7.4, votes: 983201 }
   },
   {
      title: "Neon Horizon",
      source: "viewerVault",
      data: { tomatometer: 68, audienceScore: 74 }
   },
   {
      title: "The Last Protocol",
      source: "filmCritic",
      data: { rating: 8.7, votes: 2104567 }
   },
   {
      title: "The Last Protocol",
      source: "viewerVault",
      data: { tomatometer: 91, audienceScore: 88 }
   }
] )
