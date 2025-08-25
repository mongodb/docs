Atlas Device SDKs use named pipes to support notifications and access to
the Realm file from multiple processes. While this is allowed by
default for normal user apps, it is disallowed for system apps.

System apps are defined by setting ``android:sharedUserId="android.uid.system"``
in the Android manifest. For system apps, you may see a security violation in
Logcat that looks something like this:

.. code-block:: bash

  05-24 14:08:08.984  6921  6921 W .realmsystemapp: type=1400 audit(0.0:99): avc: denied { write } for name="realm.testapp.com.realmsystemapp-Bfqpnjj4mUvxWtfMcOXBCA==" dev="vdc" ino=14660 scontext=u:r:system_app:s0 tcontext=u:object_r:apk_data_file:s0 tclass=dir permissive=0
  05-24 14:08:08.984  6921  6921 W .realmsystemapp: type=1400 audit(0.0:100): avc: denied { write } for name="realm.testapp.com.realmsystemapp-Bfqpnjj4mUvxWtfMcOXBCA==" dev="vdc" ino=14660 scontext=u:r:system_app:s0 tcontext=u:object_r:apk_data_file:s0 tclass=dir permissive=0


To fix this, you need to adjust the SELinux security rules in the ROM. This can
be done by using the tool ``audit2allow``. This tool ships as part of
`AOSP <https://source.android.com/>`__.

1. Pull the current policy from the device: ``adb pull /sys/fs/selinux/policy``.
2. Copy the SELinux error inside a text file called ``input.txt``.
3. Run the ``audit2allow`` tool: ``audit2allow -p policy -i input.txt``.
4. The tool should output a rule you can add to your existing policy.
   The rule allows you to access the Realm file from multiple processes.

``audit2allow`` is produced when compiling AOSP/ROM and only runs on
Linux. Check out the details in the `Android Source documentation 
<https://source.android.com/security/selinux/validate#using_audit2allow>`__.
Also note that since Android Oreo, Google changed the way it configures
SELinux and the default security policies are now more modularized. More details
are in the `Android Source documentation 
<https://source.android.com/security/selinux/images/SELinux_Treble.pdf>`__.
