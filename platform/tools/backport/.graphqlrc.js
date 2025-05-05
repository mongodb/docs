require('dotenv').config({ path: `${__dirname}/.env` });

const accessToken = process.env.ACCESS_TOKEN;

module.exports = {
  schema: 'github-schema.graphql',
  documents: ['./**/*.ts'],
  extensions: {
    endpoints: {
      'GitHub API V4': {
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `bearer ${accessToken}`,
          'user-agent': 'JS GraphQL',
        },
      },
    },
  },
};
