# Node Server Google Auth Example

This directory provides an example of implementing Google OAuth 2.0 on a Server using
the [Express](https://expressjs.com/) JavaScript framework and the
[Google APIs Node.js OAuth 2.0 Client](https://googleapis.dev/nodejs/googleapis/latest/oauth2/index.html).

## Getting Started

1. Install dependencies: `npm install`
2. Add config in a `.env` file with the fields specified in the `.env.example`
3. Start server: `npm run start:dev`
   3: To view and test the application, visit the homepage (default: `http://localhost:5500`)

## Expected Behavior

If you've properly configured Google Authentication, you hsould be able to log in
to a Google Account, and it redirects you to a page with a success message and your
Realm ID.
