# Realm Unity Tutorial

Follow along at https://www.mongodb.com/docs/realm/tutorial/unity/

## Troubleshooting

The most common issue is schema mismatch due to frequent little tweaks to the
schema as you develop your app.

- Be sure to **check the logs in Realm UI** for more information as well as the console in your app.
- **Delete the app from the simulator** to purge local data.
- **Restart Sync** in the Realm UI by clicking "Delete Synced Data" on the Sync page.
- Be sure to **deploy your changes** in the Realm UI.
- If your schema does not match the server, **compare the class definitions from the SDKs tab in the Realm UI** with those in the client code.
- When creating objects, make sure the **partition value of your new object matches** the partition value you opened the Realm with.

## Issues & Pull Requests

If you find an issue or have a suggestion, please let us know using the feedback
widget on the [docs site](http://www.mongodb.com/docs/realm/tutorial).

This repo is automatically derived from our main docs repo. If you'd like to
submit a pull request -- thanks! -- please feel free to do so at
https://github.com/mongodb/docs-realm/ (see the tutorial/ subdirectory).
