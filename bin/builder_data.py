"""
This file specifies the build targets and dependencies for all
automatically generated makefiles used to generate the MongoDB
documentation.

Scripts named ``makefile_<name>.py`` actually generates the
makefile, which is in turn, included in the project's main makefile,
where the following makefile instructions are responsible for
(re)generating and integrating these makefiles:

.. code-block:: makefile

   -include $(output)/makefile.pdfs
   -include $(output)/makefile.sphinx

   $(output)/makefile.%:buildtools/makefile-builder/%.py buildtools/makefile_builder.py buildtools/builder_data.py
        @$(PYTHONBIN) buildtools/makefile-builder/$(subst .,,$(suffix $@)).py $@

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

pdfs = [
# The elements of the tuples in the ``pdfs`` list are:
#     0. ``root-name``: the name of the file, without extension, that
#        Sphinx generates.
#     1. ``tag`` the tag on the file name, used in the PDF provided to
#        users.
#
#   (root-name, tag),
]

sphinx = [
# The elements of the tuples in ``sphinx`` list are:
#     0. ``target``: the name of the sphinx builder.
#     1. ``production_build``: a boolean. True if used in the
#        ``make publish`` production routine.
#
#    (target, production_build),
    ('dirhtml', True),
    ('singlehtml', True),
    ('latex', True),
    ('epub', True),
    ('html', False),
    ('gettext', False),
    ('man', False),
    ('json', False),
    ('changes', False),
    ('linkcheck', False),
]

migrations = [
]
