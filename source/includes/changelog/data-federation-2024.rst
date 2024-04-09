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
