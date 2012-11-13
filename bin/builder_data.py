"""
This file specifies the build targets and dependencies for all
automatically generated makefiles used to generate the MongoDB
documentation.

Scripts named ``makefile_builder_<name>.py`` actually generates the
makefile, which is in turn, included in the project's main makefile,
where the following makefile instructions are responsible for
(re)generating and integrating these makefiles: 

.. code-block:: makefile

   makefile-builder-system = bin/makefile_builder.py bin/builder_data.py

   -include $(output)/makefile.pdfs
   -include $(output)/makefile.tables
   -include $(output)/makefile.links

   $(output)/makefile.%:bin/makefile_builder_%.py $(makefile-builder-system)
   	@$(PYTHONBIN) bin/makefile_builder_$(subst .,,$(suffix $@)).py $@

These ``makefile_builder_<name>.py`` scripts use the
``MakefileBuilder`` class from the ``makefile_builder.py``script to
simplify make syntax and make the build process more obvious. You can
inspect these scripts directly view their output as needed to
understand their operation. 

If you need to add a new target to the build produced by one of the
existing scripts, see the comments in this file. Typically, you only
need to add a tuple to the appropriate lists, which contains
information about the build target, and the block of the makefile,
which (can) control how ``MakefileBuilder`` orders sections of the
makefile, although as of launch, no builders use this feature.
"""

links = [
# The elements of the tuples in the ``links`` list are: 
#     0. ``make_target``: the name of the target,
#     1. ``link_target``: the name of the file the symlink should point
#        at.
#     2. ``makefile_block``: the block of the makefile that captures
#        the kind/purpose of link.
#
#    (make_target, link_target, makefile_block),
     ('$(public-output)/manual', '$(manual-branch)', 'structural'),
     ('$(public-branch-output)/tutorials', 'tutorial', 'use'),
     ('$(public-branch-output)/reference/methods', 'method', 'use'),
     ('$(public-branch-output)/reference/method/reIndex', 'db.collection.reIndex', 'redirect'),
     ('$(public-branch-output)/tutorials/install-mongodb-on-red-hat-centos-or-fedora-linux', 'install-mongodb-on-redhat-centos-or-fedora-linux', 'redirect'),
]

pdfs = [
# The elements of the tuples in the ``pdfs`` list are:
#     0. ``root-name``: the name of the file, without extension, that
#        Sphinx generates.
#     1. ``tag`` the tag on the file name, used in the PDF provided to
#        users.
#
#   (root-name, tag)
    ('MongoDB', 'Manual'),
    ('MongoDB-reference', 'manual'),
    ('MongoDB-use-cases', 'guide'),
]

tables = [
# The elements of the tuples in the ``pdfs`` list are:
#     0. ``input_file``: the name of the source, .yaml file.
#     1. ``output_file``: the name of the generated .rst file.
#     2. ``makefile_block``: the name block of the makefile, which
#        captures which group of charts this file contributes to.
#
#    (input_file, output_file, makefile_block)
     ('$(rst-include)/table-sql-to-agg-terms.yaml', '$(rst-include)/table-sql-to-agg-terms.rst', 'agg'),
     ('$(rst-include)/table-sql-to-agg-examples.yaml','$(rst-include)/table-sql-to-agg-examples.rst', 'agg'),
     ('$(rst-include)/table-sql-to-mongo-executables.yaml', '$(rst-include)/table-sql-to-mongo-executables.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-terms.yaml', '$(rst-include)/table-sql-to-mongo-terms.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-schema-examples.yaml', '$(rst-include)/table-sql-to-mongo-schema-examples.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-insert-examples.yaml', '$(rst-include)/table-sql-to-mongo-insert-examples.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-select-examples.yaml', '$(rst-include)/table-sql-to-mongo-select-examples.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-update-examples.yaml', '$(rst-include)/table-sql-to-mongo-update-examples.rst', 'sql'),
     ('$(rst-include)/table-sql-to-mongo-delete-examples.yaml', '$(rst-include)/table-sql-to-mongo-delete-examples.rst', 'sql'),
]
