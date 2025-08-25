const PAGINATE_MOVIES = gql`
  query PaginateMovies(
    $prevTitle: String
    $nextTitle: String
    $limit: Int!
    $sortDirection: MovieSortByInput!
  ) {
    movies(
      # Can add other query filters here if you'd like
      query: { title_gt: $prevTitle, title_lt: $nextTitle }
      limit: $limit
      sortBy: $sortDirection
    ) {
      _id
      title
      year
    }
  }
`;

const resultsPerPage = 5;

function PaginateMovies() {
  const [variables, setVariables] = useState({
    prevTitle: undefined,
    nextTitle: undefined,
    limit: resultsPerPage,
    sortDirection: "TITLE_ASC",
  });
  const [firstTitle, setFirstTitle] = useState();
  const { data, error, loading } = useQuery(PAGINATE_MOVIES, {
    variables,
  });
  const [pagePreviousDisabled, setPagePreviousDisabled] = useState(true);
  const [pageNextDisabled, setPageNextDisabled] = useState(false);

  useEffect(() => {
    if (data?.movies?.length && firstTitle === undefined) {
      setFirstTitle(data.movies[0].title);
    }
    setPagePreviousDisabled(false);
    if (data?.movies?.length < resultsPerPage) {
      setPageNextDisabled(true);
      setPagePreviousDisabled(false);
    }
    if (
      variables.prevTitle === undefined ||
      data?.movies[0]?.title === firstTitle
    ) {
      setPagePreviousDisabled(true);
      setPageNextDisabled(false);
    }
  }, [data, data?.movies?.length, firstTitle, variables.prevTitle]);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>encountered an error: {error.message}</div>;
  }

  function goToNextPage() {
    setVariables({
      nextTitle: undefined,
      prevTitle: data.movies[data.movies.length - 1].title,
      limit: resultsPerPage,
      sortDirection: "TITLE_ASC",
    });
  }

  function goToPrevPage() {
    setVariables({
      nextTitle: data.movies[0].title,
      prevTitle: undefined,
      limit: resultsPerPage,
      sortDirection: "TITLE_DESC",
    });
  }
  const sorted = data.movies.sort((a, b) => {
    const titleA = a.title.toUpperCase(); // ignore upper and lowercase
    const titleB = b.title.toUpperCase(); // ignore upper and lowercase
    if (titleA < titleB) {
      return -1; // titleA comes first
    }
    if (titleA > titleB) {
      return 1; // titleB comes first
    }
  });
  return (
    <div>
      <h1>Movies</h1>
      {data?.movies?.length ? (
        sorted.map((movie) => (
          <div key={movie._id}>
            <h3>{movie.title}</h3>
            <p>Year Published: {" " + movie.year}</p>
            <br />
          </div>
        ))
      ) : (
        <p>No movies in system</p>
      )}
      <div>
        <button disabled={pagePreviousDisabled} onClick={goToPrevPage}>
          &larr; Previous Page
        </button>
        <button disabled={pageNextDisabled} onClick={goToNextPage}>
          Next Page &rarr;
        </button>
      </div>
    </div>
  );
}
