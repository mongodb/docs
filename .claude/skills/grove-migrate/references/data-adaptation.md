# Data Adaptation: Migrating Custom Data to Sample Datasets

<!-- canary:f5587b8f -->

This reference covers how to adapt code that uses a custom collection to use
a MongoDB sample dataset instead. Read this file when the user wants to
switch an example from custom data to a sample dataset during migration
(Step 6 of the main workflow).

## When This Applies

- The source code uses a custom collection (e.g., `db.collection('myData').find({ status: 'active' })`)
- The user wants it to use an Atlas sample dataset instead
- This is a **semantic adaptation** — field names, collection names, and
  filter values change to match the sample data

## Discover the Target Collection's Schema

Read an existing Grove example that uses the same sample collection to see
what fields are available. Search for the collection name in existing
examples:

```
examples/**/*.js  →  search for 'collection('<name>')'
```

If no existing example uses the collection, query the sample database to
inspect the collection's actual structure. Provide this command to the user
to run (do not access the connection string directly):

```
mongosh "<connection-string>" --quiet --eval "db.getSiblingDB('<sample_db>').getCollection('<collection>').findOne()"
```

## Map the Original Code's Operations to Real Data

For each operation in the original code, adapt it to the sample data:

| Original (placeholder) | Adaptation needed |
|------------------------|-------------------|
| Collection name (`myData`) | Replace with sample collection (`movies`) |
| Filter fields (`{ status: 'active' }`) | Replace with real fields that exist in the collection (`{ year: { $gt: 2000 } }`) |
| Projected fields (`{ name: 1, email: 1 }`) | Replace with real fields (`{ title: 1, year: 1 }`) |
| Sort fields (`{ createdAt: -1 }`) | Replace with real fields (`{ year: -1 }`) |
| Inserted documents | Remove inserts — sample data already exists |
| Update targets (`{ $set: { status: 'inactive' } }`) | Adapt to real fields, but ensure teardown reverts the change |

## Preserve the Operation Pattern

The **type of operation** demonstrated must remain the same. If the original
shows a filtered find, the migrated version must also show a filtered find —
using sample data fields instead of the original custom fields. Specifically:

- A `find` with a filter stays a `find` with a filter (different fields)
- An `aggregate` pipeline keeps the same stage types (different field names)
- A `sort` stays a `sort` (different sort key)
- An `insertOne` should generally stay custom data, not sample — confirm with
  the user if they still want sample data for a write-heavy example

**Preserve data types**: Make a best effort to match the data types of
accessed fields. If the original filters on a string field, the adapted
filter should also use a string field from the sample data. If a type change
is unavoidable because no sample data field matches the original type, call
that out explicitly to the user as a discrepancy.

## Track as a Semantic Discrepancy

Record each data adaptation in the discrepancy table with the category
**"Data adaptation"** so the user can verify the mappings make sense:

```
| Change | Category | Reason |
|--------|----------|--------|
| `myData` → `movies` | Data adaptation | User chose sample_mflix |
| `{ status: 'active' }` → `{ year: { $gt: 2000 } }` | Data adaptation | `status` field does not exist in movies collection; `year` preserves the filtered-find pattern |
| Removed `insertOne()` call | Data adaptation | Sample data already contains documents |
```

## Generate Accurate Expected Output

Since the code now queries a sample dataset, the expected output must reflect
actual results. Either:

1. **Run the example** against the user's connection and capture output, OR
2. **Use ellipsis patterns** liberally (`"..."`, standalone `...`) since exact
   output depends on the sample data version loaded

Prefer option 2 for fields that might vary. Use `shouldResemble().withSchema()`
for queries that return many documents with variable content.
