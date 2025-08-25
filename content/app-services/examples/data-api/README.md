# Data API Examples

This directory contains unit tested examples for use in the Data API docs.

## Set Up

Before you can run these tests, you need:

- Node.js so that we can use `npx` to call `mongodb-realm-cli`

- `shunit2`, the test framework that we use.

  - Install by running `brew install shunit2` or [build it from source](https://github.com/kward/shunit2)

- `jq` so that we can manipulate JSON strings.

  - Install by running `brew install jq` or [direct download the binary](https://stedolan.github.io/jq/download/)

- An Atlas cluster.

- An Atlas Admin API public/private key pair. Currently these must be scoped to
  the Project that contains the cluster. Don't use an Organization key in CI/CD
  (unless you also modify this code to handle it). See [Get Started with the
  Atlas Administration API](https://www.mongodb.com/docs/atlas/configure-api-access/).

## Run the Tests

To run these tests, save your Atlas information as environment variables and
call the test script:

```sh
env \
  ATLAS_PUBLIC_API_KEY=abcdefgh \
  ATLAS_PRIVATE_API_KEY=c1d23a21-b6da-4914-aba2-c429aee135d9 \
  CLUSTER_NAME=Cluster0 \
  ./generated-endpoints.sh
```

You can also run the tests through GitHub Actions by either:

- pushing a commit to a branch of
  [mongodb/docs-app-services](https://github.com/mongodb/docs-app-services) and
  then opening a pull request from that branch.

- running the actions locally with [act](https://github.com/nektos/act).

  You can run the entire workflow file with `-W`:

  ```sh
  act \
    -W .github/workflows/test-data-api.yml \
    -s ATLAS_PUBLIC_API_KEY="abcdefgh" \
    -s ATLAS_PRIVATE_API_KEY="c1d23a21-b6da-4914-aba2-c429aee135d9" \
    --env CLUSTER_NAME="Cluster0" \
    --container-architecture linux/amd64
  ```

  Or run a specific job with `-j`:

  ```sh
  act \
    -j test-data-api-data-types \
    -s ATLAS_PUBLIC_API_KEY="abcdefgh" \
    -s ATLAS_PRIVATE_API_KEY="c1d23a21-b6da-4914-aba2-c429aee135d9" \
    --env CLUSTER_NAME="Cluster0" \
    --container-architecture linux/amd64
  ```

## Generate example snippets

To generate snippets for inclusion in the docs, run the Bluehawk script:

```sh
./bluehawk.sh
```

Or manually run bluehawk on the test file(s):

```sh
npx bluehawk snip ./generated-endpoints.sh -o ../../source/data-api/snippets
```
