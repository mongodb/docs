.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Download and install

      Before you begin this tutorial, ensure you have the following dependencies
      installed in your development environment:
      
      - Compiler that supports C++17, such as `GCC <https://gcc.gnu.org/install/>`__, `Clang <https://clang.llvm.org/>`__,
        or `Visual Studio <https://visualstudio.microsoft.com/>`__
      - `CMake <https://cmake.org/>`__ v3.15 or later
      - `pkg-config
        <https://www.freedesktop.org/wiki/Software/pkg-config/>`__
      
      To download the latest version of the {+cpp-driver+} from the ``mongo-cxx-driver`` Github
      repository, run the following commands in your shell from your root directory:
      
      .. code-block:: bash

         curl -OL https://github.com/mongodb/mongo-cxx-driver/releases/download/r{+cpp-driver-version+}/mongo-cxx-driver-r{+cpp-driver-version+}.tar.gz
         tar -xzf mongo-cxx-driver-r{+cpp-driver-version+}.tar.gz
         cd mongo-cxx-driver-r{+cpp-driver-version+}/build

      Then, run following command from your
      ``mongo-cxx-driver-r{+cpp-driver-version+}/build`` directory to
      configure your driver for installation:

      .. tabs::

         .. tab:: macOS
            :tabid: configure-mac-linux

            .. code-block:: bash

               cmake ..                                \
                   -DCMAKE_BUILD_TYPE=Release          \
                   -DCMAKE_CXX_STANDARD=17              

         .. tab:: Windows
            :tabid: configure-windows

            .. code-block:: bash

               'C:\<path>\cmake.exe' .. \
                   -G "Visual Studio <version> <year>" -A "x64"         \
                   -DCMAKE_CXX_STANDARD=17                     \
                   -DCMAKE_INSTALL_PREFIX=C:\mongo-cxx-driver  \

      Finally, run the following command to build and install the
      driver:

      .. tabs::

         .. tab:: macOS
            :tabid: configure-mac-linux

            .. code-block:: bash

               cmake --build .
               sudo cmake --build . --target install

         .. tab:: Windows
            :tabid: configure-windows

            .. code-block:: bash

               cmake --build . --config RelWithDebInfo
               cmake --build . --target install --config RelWithDebInfo

   .. step:: Create your application

      Create a new directory for your project and a file named
      ``quickstart.cpp``. Copy and paste the following code into
      ``quickstart.cpp``. This code connects to your cluster and
      queries your sample data. 

      .. literalinclude:: /shared/drivers-get-started/cpp/get-started-connect.cpp
         :language: cpp

   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      In your shell, run the following commands to compile and run the application:
      
      .. code-block:: bash

         c++ --std=c++17 quickstart.cpp $(pkg-config --cflags --libs libmongocxx) -o ./app.out
         ./app.out
      
      .. tip::

         MacOS users might see the following error after running the preceding commands:

         .. code-block:: bash
            :copyable: false

            dyld[54430]: Library not loaded: @rpath/libmongocxx._noabi.dylib
 
         To resolve this error, use the ``-Wl,-rpath`` linker option to set the ``@rpath``, as shown
         in the following code: 

         .. code-block:: bash

            c++ --std=c++17 quickstart.cpp -Wl,-rpath,/usr/local/lib/ $(pkg-config --cflags --libs libmongocxx) -o ./app.out
            ./app.out

      The application output contains details about the retrieved movie document:

      .. include:: /get-started/includes/application-output.rst
