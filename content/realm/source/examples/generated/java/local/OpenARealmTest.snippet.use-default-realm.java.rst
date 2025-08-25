.. code-block:: java
   :emphasize-lines: 1

   Realm realm = Realm.getDefaultInstance();
   Log.v("EXAMPLE","Successfully opened the default realm at: " + realm.getPath());
