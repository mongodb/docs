Standard IOPS
~~~~~~~~~~~~~

If you do not select the :guilabel:`Provision IOPS` option when you create your ``M30+`` tier
{+cluster+}, the {+cluster+} uses standard |iops|. The default standard |iops|
rate changes as the {+cluster+}'s storage capacity changes. If you want to
provision an exact |iops| value, enable provisioning.

The minimum standard |iops| for ``M30+`` tier {+clusters+} is 3000.
The standard |iops| value remains at 3000 unless you set the {+cluster+} storage size
to 1TB or more. If the storage for your ``M30+`` {+cluster+} meets or exceeds 1TB,
|service| increases the standard |iops| rate using an |iops| to storage ratio of 3:1.

Local |nvme| |ssd| class {+clusters+} must use standard |iops|.

Provisioned IOPS
~~~~~~~~~~~~~~~~

To provision |iops| for your ``M30+`` tier {+cluster+}, select :guilabel:`Provision
IOPS` and either:

- Specify the exact |iops| rate in the text box, *or*

- Move the slide bar until the text box displays your preferred |iops|
  rate.

.. note::

   The available provisioned |iops| range for a {+cluster+} relates to disk
   :ref:`storage capacity <storage-capacity-ui>`. Changing your
   cluster's storage capacity changes the range of available provisioned |iops|.
