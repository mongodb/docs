Because downgrades are more difficult after you upgrade the user
authorization model, once you upgrade the MongoDB binaries to
version 2.6, allow your MongoDB deployment to run a day or two
**without** upgrading the user authorization model.

This allows 2.6 some time to "burn in" and decreases the likelihood
of downgrades occurring after the user privilege model upgrade. The
user authentication and access control will continue to work as
it did in 2.4, **but** it will be impossible to create or modify
users or to use user-defined roles until you run the authorization
upgrade.
