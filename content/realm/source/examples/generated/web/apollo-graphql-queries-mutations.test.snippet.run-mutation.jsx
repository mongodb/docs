const UPDATE_MOVIE_TITLE = gql`
  mutation UpdateMovieTitle($oldTitle: String!, $newTitle: String!) {
    updateOneMovie(query: { title: $oldTitle }, set: { title: $newTitle }) {
      title
      year
    }
  }
`;

// Must be rendered inside of an ApolloProvider
function MovieList({ movies }) {
  const [updateMovieTitle] = useMutation(UPDATE_MOVIE_TITLE);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie._id}>
          <div>{movie.title}</div>
          <button
            onClick={() => {
              updateMovieTitle({
                variables: {
                  oldTitle: movie.title,
                  newTitle: "Some New Title",
                },
              });
            }}
          >
            Update Title
          </button>
        </li>
      ))}
    </ul>
  );
}
