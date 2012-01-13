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

Running the build of the documentation can be quite illuminating, as
the build process can catch various kinds of errors in the format and
syntax of the documentation. Also from a review perspective it's
useful to see the documentation presented in another format. Besides
Sphinx, Pygments, and Python-Docutils, the documentation repository
contains all requirements for building the documentation resource.

Talk to someone on the documentation team if you are having problems
running builds yourself.
