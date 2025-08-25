# Example Testers Backend Configuration

This is the export of the Flexible Sync backend used by the example testers.

## Setup

In this directory:

```sh
npx realm-cli login
npx realm-cli push
```

Follow the prompts to import the app. If all is successful, the CLI returns the
new app ID that you can use in your code.

⚠️ In order to use the deleteAllUsers function, you MUST create secrets for the
Admin API access token.

First, you need an API key:

- Go to the Access Manager for your project: https://cloud.mongodb.com/v2/YOUR_PROJECT_ID#/access
- Click "Create API Key".
- Name your key something like Admin API Key.
- Set permissions to "Project Owner".
- Click Next. The UI will show you the new public and private keys. Copy them
  down -- the UI won't show you the secret key again.

Use the CLI to add your secrets:

```
npx realm-cli secrets create --name adminApiPublicKeySecret --value YOUR_PUBLIC_KEY_HERE
npx realm-cli secrets create --name adminApiPrivateKeySecret --value YOUR_PRIVATE_KEY_HERE
```
