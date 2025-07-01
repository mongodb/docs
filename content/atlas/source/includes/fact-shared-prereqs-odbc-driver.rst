- An :ref:`Atlas account <atlas-register-account>` with 
  a deployed {+cluster+} and {+adf+}.
         
  To learn more, see :ref:`adf-getting-started`.

- A {+fdi+} mapped to one or more data stores.

  .. include:: includes/data-federation/fact-asql-recommended-mongodb-version

- An application or BI tool that you want to connect to your 
  {+fdi+} with the ODBC driver.

- `Microsoft Visual C++ Redistributable 17.0 <https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170>`__
  or higher for installing Microsoft C and C++ (MSVC) runtime libraries. 

  .. note:: 

     If the C++ runtime libraries are not installed, the ODBC driver returns the following error: 

     .. code-block:: sh 
        :copyable: false 

        The specified module could not be found (path of the dll which exists and has the proper permission). 
