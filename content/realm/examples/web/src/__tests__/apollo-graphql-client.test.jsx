import TestRenderer from "react-test-renderer";
// :snippet-start: apollo-realm-imports
import * as Realm from "realm-web";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
// :snippet-end:

import { APP_ID } from "../realm.config.json";

describe("Set up Apollo Client", () => {
  it("Create an Apollo GraphQL Client", () => {
    // :snippet-start: create-apollo-client
    // Add your App ID
    const graphqlUri = `https://services.cloud.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
    // Local apps should use a local URI!
    // const graphqlUri = `https://us-east-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
    // const graphqlUri = `https://eu-west-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
    // const graphqlUri = `https://ap-southeast-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`

    const client = new ApolloClient({
      link: new HttpLink({
        uri: graphqlUri,
      }),
      cache: new InMemoryCache(),
    });
    // :snippet-end:
    expect(client.link.options.uri).toBe(graphqlUri);
  });

  it("Set up app with user authentication and client", () => {
    // :snippet-start: set-up-user-auth
    // Connect to your MongoDB Realm app
    const app = new Realm.App(APP_ID);

    // Gets a valid Realm user access token to authenticate requests
    async function getValidAccessToken() {
      // Guarantee that there's a logged in user with a valid access token
      if (!app.currentUser) {
        // If no user is logged in, log in an anonymous user. The logged in user will have a valid
        // access token.
        await app.logIn(Realm.Credentials.anonymous());
      } else {
        // An already logged in user's access token might be stale. Tokens must be refreshed after 
        // 30 minutes. To guarantee that the token is valid, we refresh the user's access token.
        await app.currentUser.refreshAccessToken();
      }

      return app.currentUser.accessToken;
    }

    // Configure the ApolloClient to connect to your app's GraphQL endpoint
    const client = new ApolloClient({
      link: new HttpLink({
        uri: `https://services.cloud.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
        // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
        // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
        // access token before sending the request.
        fetch: async (uri, options) => {
          const accessToken = await getValidAccessToken();
          options.headers.Authorization = `Bearer ${accessToken}`;
          return fetch(uri, options);
        },
      }),
      cache: new InMemoryCache(),
    });
    // :snippet-end:

    // :snippet-start: add-apollo-client-to-app

    // ... code to create the GraphQL client
    const AppWithApollo = () => (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    // :snippet-end:

    TestRenderer.create(AppWithApollo, document.getElementById("root"));
    function App() {
      return (
        <div>
          <p>hello apollo</p>
        </div>
      );
    }
    expect(client.link.options.uri).toBe(
      `https://services.cloud.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
    );
  });
});
