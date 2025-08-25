// :snippet-start: graphql-client
// 1. Import dependencies
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
import { useApp } from "../components/useApp";

// 2. Add GraphQL client provider
function GraphQLProvider({ children }) {
  const app = useApp();
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      // We get the latest access token on each request
      fetch: async (uri, options) => {
        const accessToken = app.currentUser?.accessToken;
        options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

// 3. GraphQL query
const GET_PLANT = gql`
  query Plant($name: String!) {
    plant(query: { name: $name }) {
      _id
      sunlight
      name
      color
      type
      _partition
    }
  }
`;

// 4. Consumer of provider and query
function PlantInformation({ name }) {
  const { loading, error, data } = useQuery(GET_PLANT, {
    variables: { name },
  });
  if (loading || !data) return <p>Loading ...</p>;
  if (error) console.error("Failed with error:", error);
  return (
    <div>
      {data.plant ? (
        <div>
          <p>{data.plant.name}</p>
          <p>{data.plant.color}</p>
        </div>
      ) : (
        "no plant"
      )}
    </div>
  );
}

// 5. Export page with the GraphQL query
export default function FullGraphQLPage() {
  return (
    <GraphQLProvider>
      <PlantInformation name="daffodil" />
    </GraphQLProvider>
  );
}

// :snippet-end:
