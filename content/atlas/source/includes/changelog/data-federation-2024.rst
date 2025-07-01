.. _adf-v20240618:

18 June 2024 Release:
~~~~~~~~~~~~~~~~~~~~~

- Supports the ability to read :ref:`Parquet <adf-parquet-data-format>` files with
  :manual:`zstd </reference/glossary/#std-term-zstd>` column compression.

.. _adf-v20240521:

21 May 2024 Release:
~~~~~~~~~~~~~~~~~~~~

- Adds support for programmatic workloads via |oidc| for {+adf+}.
  To learn more, see :ref:`oidc-authentication-workload`.
- If you're an Admin user or a user with the :authaction:`killop` privilege,
  you can use the :manual:`killOp </reference/command/killOp/>` command
  to :ref:`terminate any query <terminate-running-query>` on a federated
  database. The user who issued the query can also terminate the query.

.. _adf-v20240514:

14 May 2024 Release:
~~~~~~~~~~~~~~~~~~~~

- Changes which regions process data for unsupported regions:

  - ``ca-central-1 (Montreal)`` will process data from ``ca-west-1 (Alberta)``
    instead of ``eu-west-1 (Ireland)``.
  - ``ap-northeast-1 (Tokyo)`` will process data:

    - from ``ap-northeast-2 (Seoul)`` instead of ``eu-west-1 (Ireland)``.
    - from ``ap-northeast-3 (Osaka)`` instead of ``eu-west-1 (Ireland)``.
    - from ``ap-east-1 (Hong Kong)`` instead of ``ap-southeast-2 (Sydney)``.

- Fixes an issue where the :manual:`killOp </reference/command/killOp/>`
  command was prevented from terminating a query.

.. _adf-v20240409:

9 April 2024 Release:
~~~~~~~~~~~~~~~~~~~~~

- Adds support for the ``$sql`` stage on {+adf+} views.
- Fixes an issue where, when creating a view, {+adf+} was not 
  properly checking permissions.

.. _adf-v20240326:

26 March 2024 Release 
~~~~~~~~~~~~~~~~~~~~~

- Resolves an issue where generated dates in the ISO 8602 format caused incorrect query
  results. 

.. _adf-v20240319:

19 March 2024 Release 
~~~~~~~~~~~~~~~~~~~~~

- Fixes an issue that prevented the Python driver from failing to
  connect when using |aws| IAM authentication. 
- Fixes an issue that caused :pipeline:`$limit` queries to fail with an
  ``InternalError``. 
- Improves template partition filtering in the query planner, which
  improves query performance in certain cases against multiple blob
  storage sources.

.. _adf-v20240228:

28 February 2024 Release 
~~~~~~~~~~~~~~~~~~~~~~~~

- Makes :ref:`Azure data stores <adf-configuration-file-azure>`
  generally available for both your development and production
  deployments. 

.. _adf-v20240214:

14 February 2024 Release 
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports separate connection strings for private endpoint connections
  for :ref:`{+adf+} <config-private-endpoint>` and 
  :ref:`{+Online-Archive+} <oa-config-private-endpoint>`. 

.. _adf-v20230131:

31 January 2024 Release 
~~~~~~~~~~~~~~~~~~~~~~~

- Supports |aws| IAM if you :ref:`configure AWS IAM
  <set-up-pwdless-auth>` for authentication. This is currently unsupported 
  in the {+atlas-ui+}. 
