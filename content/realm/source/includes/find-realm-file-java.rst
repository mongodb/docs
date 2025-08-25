The filesystem used by Android emulators is not directly accessible 
from the machine running Realm Studio. You must download the file
from the emulator before you can access it.

First, find the path of the file on the emulator:

.. code-block:: java

   // Run this on the device to find the path on the emulator
   Realm realm = Realm.getDefaultInstance();
   Log.i("Realm", realm.getPath());

Then, download the file using ADB. You can do this while the app 
is running.

.. code-block:: java

   > adb pull <path>

You can also upload the modified file again using ADB, but only 
when the app isn't running. Uploading a modified file while the 
app is running can corrupt the file.

.. code-block:: java

   > adb push <file> <path>
   