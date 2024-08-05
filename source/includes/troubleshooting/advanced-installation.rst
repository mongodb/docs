Fixing the ``Library not loaded`` Error on macOS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Applications linking to a non-standard directory installation may encounter an error loading the C++ driver at runtime. Example:

.. code-block:: bash

   # Tell pkg-config where to find C++ driver installation.
   export PKG_CONFIG_PATH=$HOME/mongo-cxx-driver/lib/pkgconfig
   clang++ app.cpp -std=c++11 $(pkg-config --cflags --libs libmongocxx) -o ./app.out
   ./app.out
   # Prints the following error:
   # dyld[3217]: Library not loaded: '@rpath/libmongocxx._noabi.dylib'
   #   Referenced from: '/Users/kevin.albertson/code/app.out'
   #   Reason: tried: '/usr/local/lib/libmongocxx._noabi.dylib' (no such file), '/usr/lib/libmongocxx._noabi.dylib' (no such file)
   # zsh: abort      ./app.out

The default ``install name`` of the C++ driver on macOS includes ``@rpath``:

.. code-block:: bash

   otool -D $HOME/mongo-cxx-driver/lib/libmongocxx.dylib
   # Prints:
   # /Users/kevin.albertson/mongo-cxx-driver/lib/libmongocxx.dylib:
   # @rpath/libmongocxx._noabi.dylib

Including ``@rpath`` in the install name allows linking applications to control the list of search paths for the library.

``app.out`` includes the load command for ``@rpath/libmongocxx._noabi.dylib``. ``app.out`` does not have entries to substitute for ``@rpath``.

There are several ways to consider solving this on macOS:

Pass ``DYLD_FALLBACK_LIBRARY_PATH`` to the directory containing the C++ driver libraries:

.. code-block:: bash

   DYLD_FALLBACK_LIBRARY_PATH=$HOME/mongo-cxx-driver/lib ./app.out
   # Prints "successfully connected with C++ driver"

Alternatively, the linker option ``-Wl,-rpath`` can be passed to add entries to substitute for ``@rpath``:

.. code-block:: bash

   # Tell pkg-config where to find C++ driver installation.
   export PKG_CONFIG_PATH=$HOME/mongo-cxx-driver/lib/pkgconfig
   # Pass the linker option -rpath to set an rpath in the final executable.
   clang++ app.cpp -std=c++11 -Wl,-rpath,$HOME/mongo-cxx-driver/lib $(pkg-config --cflags --libs libmongocxx) -o ./app.out
   ./app.out
   # Prints "successfully connected with C++ driver"

If building the application with cmake, the `Default RPATH settings <https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/RPATH-handling#default-rpath-settings>`__ include the full RPATH to all used libraries in the build tree. However, when installing, cmake will clear the RPATH of these targets so they are installed with an empty RPATH. This may result in a ``Library not loaded`` error after install.

Example:

.. code-block:: bash

   # Build application ``app`` using the C++ driver from a non-standard install.
   cmake \
       -DCMAKE_PREFIX_PATH=$HOME/mongo-cxx-driver \
       -DCMAKE_INSTALL_PREFIX=$HOME/app \
       -DCMAKE_CXX_STANDARD=11 \
       -Bcmake-build -S.
   cmake --build cmake-build --target app.out
   # Running app.out from build tree includes rpath to C++ driver.
   ./cmake-build ./cmake-build/app.out
   # Prints: "successfully connected with C++ driver"

   cmake --build cmake-build --target install
   # Running app.out from install tree does not include rpath to C++ driver.
   $HOME/app/bin/app.out
   # Prints "Library not loaded" error.

Consider setting ``-DCMAKE_INSTALL_RPATH_USE_LINK_PATH=TRUE`` so the rpath for the executable is kept in the install target.

.. code-block:: bash

   # Build application ``app`` using the C++ driver from a non-standard install.
   # Use CMAKE_INSTALL_RPATH_USE_LINK_PATH=TRUE to keep rpath entry on installed app.
   cmake \
       -DCMAKE_PREFIX_PATH=$HOME/mongo-cxx-driver \
       -DCMAKE_INSTALL_PREFIX=$HOME/app \
       -DCMAKE_INSTALL_RPATH_USE_LINK_PATH=TRUE \
       -DCMAKE_CXX_STANDARD=11 \
       -Bcmake-build -S.

   cmake --build cmake-build --target install
   $HOME/app/bin/app.out
   # Prints "successfully connected with C++ driver"

See the cmake documentation for `RPATH handling <https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/RPATH-handling>`__ for more information.

Fixing the "cannot open shared object file" Error on Linux
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Applications linking to a non-standard directory installation may encounter an error loading the C++ driver at runtime. Example:

.. code-block:: bash

   # Tell pkg-config where to find C++ driver installation.
   export PKG_CONFIG_PATH=$HOME/mongo-cxx-driver/lib/pkgconfig
   g++ -std=c++11 app.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
   ./app.out
   # Prints the following error:
   # ./app.out: error while loading shared libraries: libmongocxx.so._noabi: cannot open shared object file: No such file or directory

There are several ways to consider solving this on Linux:

Pass ``LD_LIBRARY_PATH`` to the directory containing the C++ driver libraries:

.. code-block:: bash

   LD_LIBRARY_PATH=$HOME/mongo-cxx-driver/lib ./app.out
   # Prints "successfully connected with C++ driver"

Alternatively, the linker option ``-Wl,-rpath`` can be passed to add ``rpath`` entries:

.. code-block:: bash

   # Tell pkg-config where to find C++ driver installation.
   export PKG_CONFIG_PATH=$HOME/mongo-cxx-driver/lib/pkgconfig
   # Pass the linker option -rpath to set an rpath in the final executable.
   g++ app.cpp -std=c++11 -Wl,-rpath,$HOME/mongo-cxx-driver/lib $(pkg-config --cflags --libs libmongocxx) -o ./app.out
   ./app.out
   # Prints "successfully connected with C++ driver"

If building the application with cmake, the `Default RPATH settings <https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/RPATH-handling#default-rpath-settings>`__ include the full RPATH to all used libraries in the build tree. However, when installing, cmake will clear the RPATH of these targets so they are installed with an empty RPATH. This may result in a ``Library not loaded`` error after install.

Example:

.. code-block:: bash

   # Build application ``app`` using the C++ driver from a non-standard install.
   cmake \
       -DCMAKE_PREFIX_PATH=$HOME/mongo-cxx-driver \
       -DCMAKE_INSTALL_PREFIX=$HOME/app \
       -DCMAKE_CXX_STANDARD=11 \
       -Bcmake-build -S.
   cmake --build cmake-build --target app.out
   # Running app.out from build tree includes rpath to C++ driver.
   ./cmake-build ./cmake-build/app.out
   # Prints: "successfully connected with C++ driver"

   cmake --build cmake-build --target install
   # Running app.out from install tree does not include rpath to C++ driver.
   $HOME/app/bin/app.out
   # Prints "cannot open shared object file" error.

Consider setting ``-DCMAKE_INSTALL_RPATH_USE_LINK_PATH=TRUE`` so the rpath for the executable is kept in the install target.

.. code-block:: bash

   # Build application ``app`` using the C++ driver from a non-standard install.
   # Use CMAKE_INSTALL_RPATH_USE_LINK_PATH=TRUE to keep rpath entry on installed app.
   cmake \
       -DCMAKE_PREFIX_PATH=$HOME/mongo-cxx-driver \
       -DCMAKE_INSTALL_PREFIX=$HOME/app \
       -DCMAKE_INSTALL_RPATH_USE_LINK_PATH=TRUE \
       -DCMAKE_CXX_STANDARD=11 \
       -Bcmake-build -S.

   cmake --build cmake-build --target install
   $HOME/app/bin/app.out
   # Prints "successfully connected with C++ driver"

See the cmake documentation for `RPATH handling <https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/RPATH-handling>`__ for more information.
