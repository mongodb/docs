.. note:: 

    Current React Native binaries are included in the ``realm`` package. You can
    remove the binaries and the ``react-native`` directory from the build. In your
    ``package.json`` file, add a ``build.files`` entry and set its value to
    ``!**/node_modules/realm/react-native``.