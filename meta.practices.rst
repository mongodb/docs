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

Standards and Practices
-----------------------

- All non-trivial at least two people should vet all non-trivial
  changes to the documentation before publication. One of the
  reviewers should have significant technical experience with the
  material covered in the documentation.

- All development and editorial work should transpire in topic
  branches (or in "forks," on github,) that editors will merge into
  the publication branches before publication.

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

The makefile for this repository contains targets that automate the
publication process. Use "``make html``" to publish a test build of
the documentation in the "``build/``" directory of your
repository. Use "``make publish``" to build the full contents of the
manual from the current branch in the "``../public-docs/``" directory
relative the docs repository.

Other targets include:

- ``man`` - builds UNIX Manual pages for all Mongodb utilities.
- ``push`` - builds and deploys the contents of the
  "``../public-docs/``".
- ``pdfs`` - builds a PDF version of the manual (requires LaTeX
  dependencies.)

Branches
--------

This section provides an overview of the git branches in the MongoDB
documentation repository and their use.

At the present time, future work transpires in the "``master``", with
the main publication being "``current``." As the documentation
stabilizes, the documentation team will begin to maintain branches of
the documentation for specific MongoDB releases.
