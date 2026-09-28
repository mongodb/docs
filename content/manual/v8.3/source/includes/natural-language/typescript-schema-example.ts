interface Movie {
  /**
   * Unique identifier for the movie document.
   */
  _id: ObjectId;
  /**
   * Brief description of the movie's plot.
   */
  plot: string;
  /**
   * List of genres associated with the movie.
   */
  genres: string[];
  /**
   * Duration of the movie in minutes.
   */
  runtime: number;
  /**
   * Title of the movie.
   */
  title: string;
  /**
   * Number of comments on the movie in the mflix system.
   */
  num_mflix_comments: number;
  /**
   * URL to the movie's poster image.
   */
  poster: string;
  /**
   * List of countries where the movie was produced.
   */
  countries: string[];
  /**
   * Detailed description of the movie's plot.
   */
  fullplot: string;
  /**
   * Languages spoken in the movie.
   */
  languages: string[];
  /**
   * Release date of the movie.
   */
  released: Date;
  /**
   * List of directors of the movie.
   */
  directors: string[];
  /**
   * List of writers of the movie.
   */
  writers: string[];
  /**
   * Awards received by the movie.
   */
  awards: {
    /**
     * Number of awards won by the movie.
     */
    wins: number;
    /**
     * Number of award nominations received by the movie.
     */
    nominations: number;
    /**
     * Textual description of the awards.
     */
    text: string;
  };
  /**
   * Last updated timestamp for the movie document.
   */
  lastupdated: string;
  /**
   * Year the movie was released.
   */
  year: number;
  /**
   * IMDb information for the movie.
   */
  imdb: {
    /**
     * IMDb rating of the movie.
     */
    rating: number;
    /**
     * Number of votes the movie received on IMDb.
     */
    votes: number;
    /**
     * IMDb identifier for the movie.
     */
    id: number;
  };
  /**
   * Type of the movie (e.g., movie, series).
   */
  type: string;
  /**
   * Rotten Tomatoes information for the movie.
   */
  tomatoes: {
    /**
     * Viewer ratings on Rotten Tomatoes.
     */
    viewer?: {
      /**
       * Viewer rating score.
       */
      rating: number;
      /**
       * Number of reviews by viewers.
       */
      numReviews: number;
      /**
       * Viewer meter score.
       */
      meter: number;
    };
    /**
     * DVD release date.
     */
    dvd?: Date;
    /**
     * Last updated timestamp for Rotten Tomatoes data.
     */
    lastUpdated?: Date;
    /**
     * Official website for the movie.
     */
    website?: string;
    /**
     * Critic ratings on Rotten Tomatoes.
     */
    critic?: {
      /**
       * Critic rating score.
       */
      rating: number;
      /**
       * Number of reviews by critics.
       */
      numReviews: number;
      /**
       * Critic meter score.
       */
      meter: number;
    };
    /**
     * Box office earnings.
     */
    boxOffice?: string;
    /**
     * Consensus statement from Rotten Tomatoes.
     */
    consensus?: string;
    /**
     * Number of rotten reviews.
     */
    rotten?: number;
    /**
     * Production company.
     */
    production?: string;
    /**
     * Number of fresh reviews.
     */
    fresh?: number;
  };
  /**
   * Hash value for the movie document.
   */
  hash: Long;
  /**
   * MPAA rating of the movie.
   */
  rated?: string;
  /**
   * Metacritic score of the movie.
   */
  metacritic?: number;
  /**
   * List of main cast members in the movie.
   */
  cast: string[];
}
