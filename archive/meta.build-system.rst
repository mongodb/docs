=======================================================
DRAFT: MongoDB Documentation Build System Specification
=======================================================

This document address the operation and design of a build system for
produce the MongoDB Manual, the content of which resides in this
repository.

.. contents::

Requirements
------------

The build system needs:

- To build from and maintain multiple releases of documentation
  independently of each-other.

  *For example, it must be able to build and publish changes to the
  documentation for 2.1.x without publishing changes to 1.8.x.*

  We should assume that the documentation for each release is a branch
  of a git repository, but that there may be will be some topic
  branches in this that *won't* host release versions.

- That every commit, push, or update to the repository *will not*
  result in documentation publication. Because:

  - Every change to the documentations need to be reviewed and/or
    edited (a la code review; commits may also merit backporting to
    other branches) publishing.

  - Changes to documentation need to be tested locally to ensure that
    modifications don't create cross referencing problems or produce
    other build errors. For right now this is a manual process.

- That, at least for one non-default, "hyperalpha" branch (master(?)),
  commits and/or pushes do trigger a build of some sort. This might be
  for a separate repository, the implementation is not particularly
  important.

- The system must make it difficult to publish the docs in a broken
  state and that changes to the documentation are reviewed and vetted
  by the documentation team and relevant engineers before
  publication. Ideally this means the documentation build system will
  operate locally.

Workflow
--------

Branches
~~~~~~~~

(*Subject to change, depending on when the documentation becomes more
feature complete and on the MongoDB release schedule. Additionally,
the number of branches and the uses of these branches should remain
independent of the build system. This will probably change over time.*)

The following branches track documentation states that do not
correspond directly to a specific release of the server.

- "current" (tracks "master" in the server repository, and is the main
  page for the notional "docs.mongodb.org" site.)

- "hyperalpha" (is always rebuilt following commits and provides a
  tighter feedback loop for documentation contributors outside of the
  docs team and without a more keen sense of restructured text.)

The following branches track specific versioned release series of the
database server.

- 1.8-release

- 2.0-release

- latest-development (i.e. odd numbered releases.)

Largely, the branching strategy of the documentation will mirror
(albeit more simply) the branching strategy of the server. Latest
development and current might end up being the same. The exact
policy might be hard here.

Additional thoughts:

- The documentation template itself will provide an interface for
  switching between branched version.

- It would be possible to use this basic layout to underpin different
  versions of the docs for translation needs.

- Not every branch in the repository is published. There will be some
  topic, testing, and related branches with various duration as
  needed that won't be published. A list of published branches needs
  to be specified in a text file (or similar) in or near the build
  system.

Public Contributions
~~~~~~~~~~~~~~~~~~~~

(*Where public equals, anyone outside of the docs team, including
10gen engineers, other staff, and the community.*)

The "main" repository on GitHub will have a master branch that tracks
the "hyperalpha" branch. This is rebuilt regularly and is easily
accessible on the web but is excluded from ``robots.txt`` and has
no-follow links to avoid defusing the search results. Contributions
come in the form of edits directly on GitHub, or pull requests.

Then, with editing and review, changes from hyperalpha are batched and
reviewed and merged into the "current" branch. The next section covers
how the docs team works internally, and what happens to the "current"
branch.

Documentation Workflow
~~~~~~~~~~~~~~~~~~~~~~

(*This describes the publication process, and how the docs team works
internally.*)

The "current" branch is published (on average) several times a week as
needed, with changes reviewed by the docs team and engineers as needed
and appropriate, and incorporates both ongoing documentation
development and the "hyperalpha" branch. This is the main
documentation visible on the website.

Releases branch from "current," around the release of the server, and
after release only receive (mostly) minor patches and updates after
release.

*Alternately, the "main documentation" for "docs.mongodb.org" can
point to the latest stable/production (even numbered) release.*

To facilitate review and working builds, every commit or "push" to the
current branch (or any other branch, other than hyperalpha) will not
necessarily correspond to a publication run.

Operation and Implementation
----------------------------

Background
~~~~~~~~~~

In the default operation, a ``Makefile`` controls Sphinx operations
and builds. There is a third-party SCons interface that we could use
as well, I don't think this matters. Using a system like this makes it
easier to manage the collection of different build targets (html, man,
pdf, pub.) It likely (though not certainly) seems to make sense to
build on existing build system.

The build system for the driver documentation (i.e. build.py in the
apidocs) repository allows us to build documentation (from Sphinx, in
many cases) by pulling from git repositories and building from a
specific git tag. The builds are then located (per driver) in
versioned directories based on the tag name. A symbolic link named
"current" points to the current version of the documentation. These
builds are then checked into the apidocs repo, pushed to GitHub, and
then a command is issued on the web servers to pull the apidocs repo,
into the "public" directory for api.mongodb.org."

While the apidocs approach is useful and is *nearly* what the new
MongoDB documentation needs, it lacks:

- Building from multiple branches.

- Automatic/(near)-instant feedback for the "hyperalpha" branch (only)

- Putting information related to the version/branch of the
  documentation in the display of the documentation itself.

Additionally, while storing previous builds of the documentation has
some value for the drivers, it holds less value for the server docs.

Interface/Design
~~~~~~~~~~~~~~~~

If we use git as a transport for deploying content to production, as
with the "apidocs" repo; then the build system could consist of
nothing more than a Makefile target in the existing documentation
build system that builds the version of git's working copy and moves
it to the "docs-publication repo" and from here the deployment process
is identical to the driver docs.

In this case, we'd need to make sure that we provide some check to
prevent people from (likely accidentally) building
current/master/hyperalpha into a maintenance branch (for example.)
This might require some way of ensuring that the remote branches are
properly mapped to the local branches. The "hyperalpha," branch
automated builds would probably then need to happen through some other
method.

Problems here (can be addressed, but seem like potential hang ups:)

- Checking to make sure that public branches referenced in the build
  process actually exist.

- If people's local branches are misconfigured respective to remote
  branches they may/will end up building versions that don't make
  sense. It doesn't make much sense to enforce git use policy in this
  way, at least without a safe "``make config-git-branches``" target
  that ensures things are properly configured.

- Having a build process that is itself versioned in a branched system
  that it must build, makes it difficult to update the build
  system. At the same time, putting the build system in the
  "transport" repository increases the complexity for people who
  (might) want to get involved with or test the documentation.

Open Questions and Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The "`read the docs <https://github.com/rtfd/readthedocs.org>`_
  provides some automation and chrome around Sphinx documentation
  workflow, and their system is open source (link above.) I think it's
  more than the MongoDB documentation needs, but might worth tracking.

- How the templates get information about the public branches.

  Above I mention having a text file with a list of branches to build
  from. As part of the documentation build system we need a way of
  getting information about the different public branches into the
  actual display of the documentation.

- Some of the content in the manual may be suitable for inclusion in
  the main server distribution, but this process needs to be automated
  and coordinated with build engineering/release management for the
  server project.

- Heretofore, I've been building the docs using the "html" target. As
  we move to production I think we should move to using "dirhtml" and
  maybe doing a little bit of clean up of the `Makefile`. This is
  trivial, but we need to make a decision.

- The build system needs to include support for including publishing
  PDF and ePUB editions of the manual, at least for the releases. (git
  might be a poor transport for this, we might not care.)

- It might make sense to have some simple git-use helpers (or
  documentation!) for some of the more basic cherry picking, merging,
  and initial branch configuration tasks to lower the barrier for new
  people working on the docs and prevent simple errors.
