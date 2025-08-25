import TestRenderer from "react-test-renderer";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import AppWithApolloPagination from "../GraphQLPagination";
import * as Realm from "realm-web";
// :snippet-start: import-dependencies-query
// import whichever Apollo hooks you're using
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
// :snippet-end:
import { GRAPHQL_APP_ID } from "../realm.config.json";

// :snippet-start: run-query

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
// :snippet-end:

// :snippet-start: run-mutation
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
// :snippet-end:

const movies = [
  {
    _id: 1,
    title: "Defiance",
    year: 2008,
    runtime: 137,
  },
  {
    _id: 2,
    title: "Dunkirk",
    year: 2017,
    runtime: 106,
  },
  {
    _id: 3,
    title: "Operation Mincemeat",
    year: 2021,
    runtime: 128,
  },
  {
    _id: 4,
    title: "The Imitation Game",
    year: 2014,
    runtime: 114,
  },
  {
    _id: 5,
    title: "Valkyrie",
    year: 2008,
    runtime: 124,
  },
  {
    _id: 6,
    title: "Enemy at the Gates",
    year: 2001,
    runtime: 131,
  },
  {
    _id: 7,
    title: "Saving Private Ryan",
    year: 1997,
    runtime: 169,
  },
];
const app = new Realm.App(GRAPHQL_APP_ID);
beforeAll(async () => {
  const user = await app.logIn(Realm.Credentials.anonymous());
  await user
    .mongoClient("mongodb-atlas")
    .db("example")
    .collection("movies")
    .deleteMany({});
  await setTimeout(function () {
    return;
  }, 1000);
  await user
    .mongoClient("mongodb-atlas")
    .db("example")
    .collection("movies")
    .insertMany(movies);
});
afterAll(async () => {
  const user = await app.logIn(Realm.Credentials.anonymous());
  await user
    .mongoClient("mongodb-atlas")
    .db("example")
    .collection("movies")
    .deleteMany({});
  await user.logOut();
});
describe("Queries and mutations", () => {
  let clicked = false;
  const mocks = [
    {
      request: {
        query: ALL_MOVIES,
      },
      result: {
        data: {
          movies,
        },
      },
    },
    {
      request: {
        query: UPDATE_MOVIE_TITLE,
        variables: {
          oldTitle: "Defiance",
          newTitle: "Some New Title",
        },
      },
      result: function () {
        clicked = true;
        return {
          data: {
            updateOneMovie: {
              title: "Some New Title",
              year: 1997,
            },
          },
        };
      },
    },
  ];

  it("Run a query", async () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Movies />
      </MockedProvider>
    );
    const tree = component.toJSON();
    expect(tree.children).toContain("loading");
    await new Promise((resolve) => setTimeout(resolve, 10));
    const divs = await component.root.findAllByType("div");
    expect(divs.length).toBe(7);
  });

  it("Run a mutation", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieList movies={movies} />
      </MockedProvider>
    );
    const buttons = await screen.findAllByText("Update Title");
    fireEvent.click(buttons[0]);
    await waitFor(
      async () => {
        expect(clicked).toBe(true);
      },
      { timeout: 3000 }
    );
  });

  it("Paginate results", async () => {
    const AppWithApollo = () => <AppWithApolloPagination />;

    render(<AppWithApollo />);
    let nextButton, previousButton;
    await waitFor(
      async () => {
        nextButton = await screen.findByText("Next Page →");
      },
      { timeout: 3000 }
    );
    const page1Headings =
      "Movies,Defiance,Dunkirk,Enemy at the Gates,Operation Mincemeat,Saving Private Ryan";
    await waitFor(async () => {
      const headingNodes = await screen.findAllByRole("heading");
      const headings = headingNodes.map((node) => node.innerHTML).join(",");
      expect(headings).toBe(page1Headings);
    });
    fireEvent.click(nextButton);
    await waitFor(
      async () => {
        // Can go forward a page and show next page of movies
        const headingNodes = await screen.findAllByRole("heading");
        const headings = headingNodes.map((node) => node.innerHTML).join(",");
        expect(headings).toBe("Movies,The Imitation Game,Valkyrie");
      },
      { timeout: 3000 }
    );
    await waitFor(async () => {
      previousButton = await screen.findByText("← Previous Page");
      expect(previousButton).not.toBeDisabled();
    });
    await waitFor(async () => {
      nextButton = await screen.findByText("Next Page →");
      // The 'Next Page' button is disabled on last page
      expect(nextButton).toBeDisabled();
    });

    fireEvent.click(previousButton);
    await waitFor(async () => {
      previousButton = await screen.findByText("← Previous Page");
      // The 'Previous Page' button is disabled on first page
      expect(previousButton).toBeDisabled();
    });
    await waitFor(async () => {
      const headingNodes = await screen.findAllByRole("heading");
      const headings = headingNodes.map((node) => node.innerHTML).join(",");
      expect(headings).toBe(page1Headings);
    });
  });
});
