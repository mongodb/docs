- Must be running MongoDB 2.4.9 or later.

- Must have the MongoDB ``security.javascriptEnabled`` set to ``true``, which
  is the default. The |application| uses the :query:`$where` query and
  requires this setting be enabled on all backing instances.

- Must **not** run the MongoDB ``notablescan`` option.
