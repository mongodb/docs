Device Sync adds network synchronization between an App Services backend and
client devices on top of all of the functionality of Realm.
When you use Realm with Sync, realms exist on device,
similar to using Realm without Sync. However, changes to
the data stored in those realms synchronize between all client
devices through a backend App Services instance. That backend also stores
realm data in a cloud-based Atlas cluster running MongoDB.

Device Sync relies on a worker client that communicates with your
application backend in a dedicated thread in your application.
Additionally, synced realms keep a history of changes to contained
objects. Sync uses this history to resolve conflicts between client
changes and backend changes.

Applications that use Device Sync define their schema on the backend using
`JSON Schema <https://json-schema.org/learn/getting-started-step-by-step.html>`__.
Client applications must match that backend schema to synchronize data.
However, if you prefer to define your initial schema in your application's
programming language, you can use :ref:`Development Mode
<development-mode>` to create a backend JSON Schema based on
native SDK objects as you write your application. However, once your
application is used for production purposes, you should alter your
schema using JSON Schema on the backend.
