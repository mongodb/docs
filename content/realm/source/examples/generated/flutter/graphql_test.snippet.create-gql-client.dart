// Build GraphQL endpoint and client
// In the `authLink`, retrieve the accessToken from the app's
// currently logged in user on each request.
// If there's no logged in user, pass an empty string as Bearer token,
// causing the request to fail.
final authLink = AuthLink(
  getToken: () => 'Bearer ${app.currentUser?.accessToken ?? ""}',
);
final link = authLink.concat(HttpLink(YOUR_GRAPHQL_URL));
final client = GraphQLClient(link: link, cache: GraphQLCache());
