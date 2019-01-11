.. _provider-settings-volume-type:

*AWS only*. Possible values are:

- ``STANDARD``

  In this case, , the setting
  :ref:`providerSettings.diskIOPS <provider-settings-disk-iops>`
  must not exceed the default |iops| rate for the selected volume
  size.

- ``PROVISIONED``

  In this case, the setting
  :ref:`providerSettings.diskIOPS <provider-settings-disk-iops>`
  must fall within the allowable |iops| range for the selected
  volume size.