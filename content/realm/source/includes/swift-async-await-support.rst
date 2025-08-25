Starting with Realm Swift SDK Versions 10.15.0 and 10.16.0, many of the 
Realm APIs support the Swift async/await syntax. Projects must 
meet these requirements:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: index-table

   * - Swift SDK Version
     - Swift Version Requirement
     - Supported OS

   * - 10.25.0
     - Swift 5.6
     - iOS 13.x

   * - 10.15.0 or 10.16.0
     - Swift 5.5
     - iOS 15.x

If your app accesses Realm in an ``async/await`` context, mark the code 
with ``@MainActor`` to avoid threading-related crashes.
