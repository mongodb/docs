// 1. import dependencies
import nookies from "nookies";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

// 2. Function to create GraphQL client
const createClient = (token) =>
  new ApolloClient({
    link: new HttpLink({
      ssrMode: true,
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  });

// 3. GraphQL Query used in SSR
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

// 4. Server-side logic to parse cookie and run query
export async function getServerSideProps(context) {
  const { accessToken } = nookies.get(context);
  const client = createClient(accessToken);
  const {
    data: { plant: lily },
  } = await client.query({
    query: GET_PLANT,
    variables: { name: "daffodil" },
  });

  return {
    props: { lily },
  };
}

// Full page exported that gets the data from SSR
export default function Ssr({ lily }) {
  return (
    <div>
      <h1>Data from Server-Side Rendering</h1>
      {lily ? (
        <div>
          <p>{lily.name}</p>
          <p>{lily.color}</p>
        </div>
      ) : (
        "no plant"
      )}
    </div>
  );
}
