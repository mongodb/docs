
const ALL_MOVIES = gql`
  query AllMovies {
    movies {
      _id
      title
      year
      runtime
    }
  }
`;
// Must be rendered inside of an ApolloProvider
function Movies() {
  const { loading, error, data } = useQuery(ALL_MOVIES);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>encountered an error: {error}</div>;
  }
  return <MovieList movies={data.movies} />;
}
