.. note:: Release notes mention only releases with feature changes

   MongoDB releases {+adf+} every two weeks, continuously improving
   {+adf+} performance and stability. These release notes capture only
   those releases that contain feature changes. If a particular {+adf+}
   release contains only performance and stability improvements, it is not
   included in these release notes. To identify which release version you
   are using, check the release version string for the release date.

.. _adf-v20230124:

24 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds the application name to connections that {+adf+} creates to your
  |service| {+clusters+}.
- Adds the ability to set and update the storage configuration using the
  |service| :oas-atlas-tag:`Data Federation API </Data-Federation>`.

.. _adf-v20230111:

11 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Fixes an issue that caused ``maxTimeMS`` with a ``batchSize`` of ``0``
  to fail.
