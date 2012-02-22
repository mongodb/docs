=============================================
MongoDB Documentation Practices and Processes
=============================================

This document provides an overview of the practices and processes that
the documentation uses and hopes to use to maintain the
documentation. This is a work in progress.

Commits
-------

When possible, relevant, include a Jira case identifier in a commit
message. Reference documentation cases when relevant, but feel free to
reference other cases from <http://jira.mongodb.org/>.

Err on the side of creating a larger number of discrete commits rather
than bundling large set of changes into one commit.

For the sake of consistency, avoid committing trailing whitespace in
the source file. Additionally, the existing files are "hard wrapped"
to 70 characters per-line, which you can adhere to if it is easy for
you.

Collaboration
-------------

To propose a change to the documentation, either:

- Open a ticket in the `documentation project
  <https://jira.mongodb.org/browse/DOCS>`_ proposing the change and
  someone on the documentation team will make the change and be in
  contact with you so that you can review our change.

- Using github, fork the repository, commit your changes to this
  repository and issue a pull request, and someone on the
  documentation team will review and incorporate your change into the
  documentation.

Builds
------

Building the documentation is useful because Sphinx and docutils can
catch numerous errors in the format and syntax of the
documentation. Additionally, having access to an example documentation
as it *will* appear to the users is useful for providing more
effective basis for the review process. Besides Sphinx, Pygments, and
Python-Docutils, the documentation repository contains all
requirements for building the documentation resource.

Talk to someone on the documentation team if you are having problems
running builds yourself.

Publication
-----------

The makefile for this repository contains targets for the publication
process. In order to maintain multiple versions of the documentation
(to reflect different versions of the MongoDB server, for editing,
review, etc.,) the makefile adds a couple of targets to the default
Sphinx makefile. In the ``build-branch`` target, Sphinx builds the
documentation into branch-specific folders. The ``deploy`` target
moves these builds to into a local mirror (i.e. "``../public-docs``")
of the documentation resource and calls a "``publish.sh``" script that
handles the upload process itself.

To publish the documentation, use the following procedure:

1. Checkout the branch of the documentation that you want to publish,
   make/apply all changes that you wish to publish.

2. Build the following target. This operation builds all components of
   the documentation required for publication . ::

        make build-branch

3. Build the following target. This procedure exports the build to the
   "``../public-docs``" directory and runs the "``publish.sh``"
   script. ::

        make deploy

The ``publish`` target (i.e. "``make publish``") combines
``build-branch`` and ``deploy`` procedures. 

Branches
--------

This section provides an overview of the git branches in the MongoDB
documentation repository and their use.

At the present time, future work transpires in the "``master``", with
the main publication being "``current``." As the documentation
stabilizes, the documentation team will begin to maintain branches of
the documentation for specific MongoDB releases.
