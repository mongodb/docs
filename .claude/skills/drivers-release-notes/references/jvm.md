# JVM (Java Sync, Java Reactive Streams, Kotlin Sync, Kotlin Coroutine, Scala)

**Add for:** major, minor, and patch releases

| Variable | Value |
|---|---|
| `GITHUB_REPO` | `mongodb/mongo-java-driver` |
| `CHANGELOG_LINK` | `mongodb/mongo-java-driver/releases/tag/r{VERSION}` |

**Release notes files by product:**

| Product | `RELEASE_NOTES_FILE` |
|---|---|
| Java Sync | `content/java/upcoming/source/reference/release-notes.txt` |
| Java Reactive Streams | `content/java-rs/upcoming/source/whats-new.txt` |
| Kotlin Sync | `content/kotlin-sync/upcoming/source/reference/whats-new.txt` |
| Kotlin Coroutine | `content/kotlin/upcoming/source/reference/release-notes` |
| Scala | `content/scala-driver/upcoming/source/whats-new.txt` |

The JVM workflow uses a shared file across all sub-drivers:

1. Add release notes to the shared JVM file in the `10gen/docs-shared`
   repository. Before making changes in `docs-shared`, ask the user if
   they want you to check out a new branch named `{VERSION}-wn-items`.
   Then, create the shared file `dbx/jvm/v{VERSION}-wn-items.rst` if it
   does not exist. This file contains a list of items with no header.
2. In the `RELEASE_NOTES_FILE` for each JVM driver, add a `What's New in
   {VERSION}` section using the **JVM: Standard Section Format** template
   from `references/docs-templates.md`.

   If a release note entry explicitly mentions a specific JVM driver, add it
   as a bullet point above the `sharedinclude` instead of in the shared file.
   For example, the 5.7 JVM release notes mention adding support for Scala 3
   and this was added to Scala's `whats-new.txt` only.
3. Breaking changes:
   - **Java Sync, Kotlin Sync, Kotlin Coroutine**: `{UPGRADE_REF}` =
     `<language>-breaking-changes-v{VERSION}` (replace `<language>` with the
     lowercase driver name: `java-sync`, `kotlin-sync`, `kotlin`). Add to the
     upgrade guide for these drivers only.
   - **Java Reactive Streams and Scala**: no upgrade guide. Use the **JVM:
     Breaking Changes Admonition (Java Reactive Streams and Scala)** template
     from `references/docs-templates.md` instead.
   - **Server version support change** (any sub-driver): use the **JVM: Server
     Version Support Admonition** template from `references/docs-templates.md`
     instead of the breaking changes admonition.
4. If you make changes in both `docs-shared` and `docs-mongodb-internal`,
   tell the user they must open a pull request in each repository.
