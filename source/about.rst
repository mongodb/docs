===========================
About MongoDB Documentation
===========================

.. default-domain:: mongodb

.. _meta-about-mongodb:

About MongoDB
-------------

MongoDB is a :term:`document` oriented database system built upon a
design that highlights high performance, easy scaling, high
availability, and a rich query language. See the following :wiki:`wiki
pages <>` for more information about regarding the MongoDB

- :wiki:`Introduction`
- :wiki:`Philosophy`
- :wiki:`Features`
- :wiki:`About`

If you want to download MongoDB, see the `downloads page
<http://www.mongodb.org/downloads>`_. Also consider the :doc:`drivers
</applications/drivers>` page for more information about the client
libraries that your application can use to interact with a MongoDB
instance.

.. _meta-about-documentation-project:

About the Documentation Project
-------------------------------

This Manual
~~~~~~~~~~~

The MongoDB Documentation project aims to complete a full manual for
the MongoDB database server that describes it's use, behavior,
operation, and administration. See ":doc:`/contents`" for a full index
of all content in this manual. The information in this resource is
replacing MongoDB's first documentation resource, located on the
`MongoDB Wiki <http://mongodb.org>`_ (for a topical overview see the
:ref:`MongoDB wiki outline <mongodb-wiki>`.)

Licensing
`````````

The full contents of this manual is licensed under a Creative Commons
"`Attribution-NonCommercial-ShareAlike 3.0 Unported
<http://creativecommons.org/licenses/by-nc-sa/3.0/>`_"
(i.e. "CC-BY-NC-SA") license.

The MongoDB Manual is copyright |copy| 2011-2012 10gen, Inc.

Version and Revisions
`````````````````````

This version of the manual reflects version |version| of MongoDB.

See the `MongoDB Documentation Project Page <http://docs.mongodb.org>`_
for an overview of all editions and output formats of the MongoDB
Manual. You can see the full revision history, and track ongoing
improvements and additions for all versions of the manual the `GitHub
repository <https://github.com/mongodb/docs>`_.

This edition of manual reflects "|branch|" branch of the documentation
as of the "|commit|" revision. This branch is explicitly accessible
via "|hardlink|" and you can always reference the commit of the
current manual in the :hardlink:`release.txt` file.

The most up-to-date, current, and stable version of the manual is
always avalible at "http://docs.mongodb.org/manual/."

Contributing to the Documentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The entire source of the documentation is available in the `docs
repository <https://github.com/mongodb/docs>`_ along with all of the
other `MongoDB Project Repositories on GitHub <http://github.com/mongodb>`_.
You can clone the repository by issuing the following command at your
system shell:

.. code-block:: sh

   git clone git://github.com/mongodb/docs.git

If you have a GitHub account want to fork this repository, feel free
to issue pull requests and someone on the documentation team will
merge in your contributions promptly. Please complete the
`MongoDB/10gen Contributor Agreement <http://www.10gen.com/contributor>`_
so that we can expedite the  merge process.

The project tracks issues using the `MongoDB Jira Instance
<http://jira.mongodb.org/>`_ and the :issue:`DOCS` project. Feel free
to open a :issue:`DOCS` case if you see a problem with the
documentation and someone on the documentation team will work to
resolve this issue as quickly as possible.

Writing Documentation
~~~~~~~~~~~~~~~~~~~~~

The MongoDB Manual uses `Sphinx <http://sphinx.pocoo.org/>`_, a
sophisticated documentation engine built upon `Python Docutils
<http://docutils.sourceforge.net/>`_ to generate the content of the
manual. Sphinx translates all of the content from plain text files
using `reStructured Text <http://docutils.sourceforge.net/rst.html>`_
into the documentation resource. All Sphinx extensions and build tools
are available in the same repository as the documentation.

Additionally, you can see the official documentation style guidelines
and build instructions in reSturctured Text files in the top-level of
the `documentation repository <https://github.com/mongodb/docs>`_. If
you have any questions, please feel free to open a `Jira Case <https://jira.mongodb.org/browse/DOCS>`_.
