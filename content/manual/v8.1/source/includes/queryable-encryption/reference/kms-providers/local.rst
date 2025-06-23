Architecture
````````````

When you use a Local Key Provider for testing, your application
retrieves your {+cmk-long+} from the computer it runs on. To
use a Local Key Provider in production, use an approach that doesn't store the
key on the file system. For example, you can inject the key into the client
process via a sidecar.

The following diagram describes the architecture of a {+qe+}-enabled
application using a Local Key Provider.

.. image:: /images/CSFLE_Data_Key_Local.png
   :alt: Local Key Provider architecture diagram.

kmsProviders Object
```````````````````

The following table presents the structure of a ``kmsProviders``
object for a Local Key Provider:

.. list-table::
  :header-rows: 1
  :stub-columns: 1
  :widths: 30 15 45

  * - Field
    - Required
    - Description

  * - key
    - Yes
    - The master key used to encrypt/decrypt data keys.
      The master key is passed as a base64 encoded string.

dataKeyOpts Object
``````````````````

When you use a Local Key Provider, you specify your {+cmk-long+}
through your ``kmsProviders`` object.
