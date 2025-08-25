React Native enables simultaneous development of both an
iOS and Android app that use the same React codebase. You
can edit the ``.js`` or ``.ts`` source files in your
project directory to develop your app.

In development, the apps read their React source code as
a bundle from a local bundle server. To run the bundle
server, use the following command in your React Native
project directory:

.. code-block:: bash

  npm start

With the bundle server running, you can now launch the Android and iOS apps:

- To run the Android app, use Android Studio to open the ``android`` directory in your project directory and click :guilabel:`Run`.
- To run the iOS app, use Xcode to open the ``.xcworkspace`` file in the ``ios`` directory. If you did not use CocoaPods during setup, open the ``.xcodeproj`` file in the ``ios`` directory instead. Once you have opened the project, click :guilabel:`Run`.
