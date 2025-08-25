The React Native SDK docs testing suite is dvided into two directories: legacy
and v12.

Tests in the legacy directory use versions of Realm.js before v12.0.0. Tests in
the v12 directory use Realm.js v12.0.0 and later.

We no longer add new examples or tests in the legacy directory. However, we can
update existing legacy examples when needed. For example, if there isn't
enough time to convert a legacy test to the v12 test suite.

There are many reasons for splitting the directories, but the largest is a shift
in testing philosophy. You can learn more about that in the v12 directory's
README file.
