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
