# Documentation Templates

RST templates used by the `drivers-release-notes` skill. Use these when drafting new release notes and upgrade guide sections.

## Shared Templates

### Standard Entry Format

```rst
.. _driver-version-x.y:

What's New in X.Y
-----------------

The X.Y driver release includes the following new features,
improvements, and fixes:

...

.. _driver-version-x.x:

What's New in X.X
-----------------

The X.X driver release includes the following new features,
improvements, and fixes:

...
```

### Standard Breaking Changes Warning Admonition

```rst
.. warning:: Breaking Changes

   {+driver-short+} v{VERSION} contains breaking changes. For more information,
   see :ref:`{UPGRADE_REF}` in the Upgrade guide.
```

### Standard Upgrade Guide Section

```rst
.. _{UPGRADE_REF}:

Version {VERSION} Breaking Changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
...
```

## Driver-Specific Templates

### C++: Upgrade Guide Structure

~~~~~~~~~~~~~~~~~~~
.. _{UPGRADE_REF}:

Version {VERSION}
~~~~~~~~~~~~~~~~~

Build System Breaking Changes in v{VERSION}
```````````````````````````````````````````
...

API Breaking Changes in {VERSION}
`````````````````````````````````
...

ABI Breaking Changes in {VERSION}
`````````````````````````````````
...
~~~~~~~~~~~~~~~~~~~

### C: Upgrade Guide Structure

~~~~~~~~~~~~~~~~~~~
.. _{UPGRADE_REF}:

Version {VERSION}
~~~~~~~~~~~~~~~~~

{+libbson+} Breaking Changes
````````````````````````````
...

{+libmongoc+} Breaking Changes
``````````````````````````````
...
~~~~~~~~~~~~~~~~~~~

### Django MongoDB Backend: Breaking Changes Admonition

```rst
.. warning:: Breaking Changes

   The {+django-odm+} v{FULL_VERSION} release introduces the following
   breaking changes:

   <list of breaking changes>
```

### JVM: Standard Section Format

```rst
What's New in {VERSION}
-----------------------

The {VERSION} driver release includes the following changes, fixes,
and features:

- ... <any driver-specific release notes>

.. sharedinclude:: dbx/jvm/v{VERSION}-wn-items.rst
```

### JVM: Breaking Changes Admonition (Java Reactive Streams and Scala)

```rst
.. warning:: Breaking Changes

   {+driver-short+} v{VERSION} includes the following breaking changes:

   <list of breaking changes>
```

### JVM: Server Version Support Admonition

```rst
.. important:: Server Version Support Change

   <Add information about server version support change. Link to
   compatibility page.>
```

### Spark Connector: Breaking Changes Admonition

```rst
.. warning:: Breaking Changes

   The {VERSION} connector release includes the following breaking changes:

   <list of breaking changes>
```

### C# Analyzer: Breaking Changes Admonition

```rst
.. warning:: Breaking Changes

   The {VERSION} {+product+} release includes the following breaking changes:

   <list of breaking changes>
```

### PyMongoArrow: Breaking Changes Admonition

```rst
.. warning:: Breaking Changes

   {+driver-short+} v{VERSION} introduces the following breaking changes:

   <list of breaking changes>
```

### Mongoid: Breaking Changes Admonition

```rst
.. warning:: Breaking Changes

   {+odm+} v{VERSION} introduces the following breaking changes:

   <list of breaking changes>
```

## Full Example: Node.js 7.0

### Node.js 7.0: Release Notes Entry

```rst

What's New in 7.0
-----------------

.. warning:: Breaking Changes

   {+driver-short+} v7.0 contains breaking changes. For more information,
   see :ref:`node-breaking-changes-v7.0` in the Upgrade guide.

The 7.0 driver release includes the following new features,
improvements, and fixes:

- <item>

To learn more about this release, see the
:github:`v7.0 Release Notes
<mongodb/node-mongodb-native/releases/tag/v7.0.0>` on GitHub.
```

### Node.js 7.0: Upgrade Guide Entry

```rst
.. _node-breaking-changes-v7.0:

Version 7.0 Breaking Changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- <item>
```
