.. code-block:: kotlin
   :emphasize-lines: 1

   val realm = Realm.getDefaultInstance()
   Log.v("EXAMPLE","Successfully opened the default realm at: ${realm.path}")
