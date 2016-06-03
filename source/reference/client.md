
## selectCollection()

```php
function selectCollection($databaseName, $collectionName, array $options = []): MongoDB\Collection
```

Select a collection on the server.

The Collection will inherit options (e.g. read preference, type map) from the
Client object unless otherwise specified.

### Supported Options

readConcern (MongoDB\Driver\ReadConcern)
:   The default read concern to use for collection operations. Defaults to the
    Client's read concern.

readPreference (MongoDB\Driver\ReadPreference)
:   Sel

typeMap (array)
:   Default type map for cursors and BSON documents. Defaults to the Client's
    type map.

writeConcern (MongoDB\Driver\WriteConcern)
:   The default write concern to use for collection operations. Defaults to the
    Client's write concern.

### Example

The following example selects the "demo.users" collection:

```
<?php

$client = new MongoDB\Client;

$collection = $client->selectCollection('demo', 'users');
```

The following examples selects the "demo.users" collection with a custom read
preference:

```
<?php

$client = new MongoDB\Client;

$collection = $client->selectCollection(
    'demo',
    'users',
    [
        'readPreference' => new MongoDB\Driver\ReadPreference(MongoDB\Driver\ReadPreference::RP_SECONDARY),
    ]
);
```

### See Also

 * [MongoDB\Collection::__construct()](collection.md#__construct)
 * [MongoDB\Client::__get()](#__get)


---

## selectDatabase()

```php
function selectDatabase($databaseName array $options = []): MongoDB\Collection
```

Select a database on the server.

The Database will inherit options (e.g. read preference, type map) from the
Client object unless otherwise specified.

### Supported Options

readConcern (MongoDB\Driver\ReadConcern)
:   The default read concern to use for database operations. Defaults to the
    Client's read concern.

readPreference (MongoDB\Driver\ReadPreference)
:   The default read preference to use for database operations. Defaults to the
    Client's read preference.

typeMap (array)
:   Default type map for cursors and BSON documents. Defaults to the Client's
    type map.

writeConcern (MongoDB\Driver\WriteConcern)
:   The default write concern to use for database operations. Defaults to the
    Client's write concern.

### Example

The following example selects the "demo" database:

```
<?php

$client = new MongoDB\Client;

$db = $client->selectDatabase('demo');
```

The following examples selects the "demo" database with a custom read
preference:

```
<?php

$client = new MongoDB\Client;

$db = $client->selectDatabase(
    'demo',
    [
        'readPreference' => new MongoDB\Driver\ReadPreference(MongoDB\Driver\ReadPreference::RP_SECONDARY),
    ]
);
```

### See Also

 * [MongoDB\Database::__construct()](database.md#__construct)
 * [MongoDB\Client::__get()](#__get)

---
