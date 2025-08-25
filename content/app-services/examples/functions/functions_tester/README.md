# functions_tester

App for testing App Services functions/functionality.

## Testing changes

You must be added to the `BushiCorp` MongoDB Atlas project before you push the
App to the cloud.

Then set up the Bushicorp profile setup locally in your `realm-cli`:

```sh
realm-cli login --api-key <dev api key> --private-api-key <dev private api key> --profile=bushicorp
```

Push changes to Atlas. Make sure to specify `profile-bushicorp`.

```sh
realm-cli push --remote="functions_tester-qodrp" --profile=bushicorp
```

Then test changes by running:

```sh
npm test
```
