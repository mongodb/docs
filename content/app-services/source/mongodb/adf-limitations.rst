You can link a `{+adf-instance+}
<https://www.mongodb.com/atlas/data-federation?tck=docs_realm>`__ to your app
as a MongoDB data source. However, there are some caveats to keep in
mind when working with {+adf+}:

- {+adf-datasource+}s :atlas:`do not support write operations </data-federation/supported-unsupported/mql-support/>`.

- You can only access a {+adf-datasource+} from a :ref:`system function <system-functions>`.

- You cannot connect to a {+adf-datasource+} via the :ref:`wire protocol <wire-protocol>`.

- You cannot define :ref:`roles and permissions <define-roles-and-permissions>` for a {+adf-datasource+}.

- You cannot set a :ref:`read preference <read-preference>` for a {+adf-datasource+}.

- You cannot create a :ref:`database trigger <database-trigger>` on a {+adf-datasource+}.

- You cannot use a {+adf-datasource+} as your app's :ref:`Device Sync <sync>` cluster.
