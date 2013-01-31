tables = [
# The elements of the tuples in the ``pdfs`` list are:
#     0. ``name``: the name of the source, without the .yaml extenison.
#     1. ``makefile_block``: the name block of the makefile, which
#        captures which group of charts this file contributes to.
#
#    (name, makefile_block),
     ('$(rst-include)/table-driver-syntax', 'ref'),
     ('$(rst-include)/table-sql-to-mongo-to-cpp-examples', 'ref'),
]

sphinx = [
# The items in the ``sphinx`` list are the name of the sphinx builder.
#
    'dirhtml',
    'singlehtml',
    'latex',
    'epub',
    'html',
    'gettext',
    'man',
    'json',
    'changes',
    'doctest',
    'linkcheck',
    'texinfo',
    'draft-html',
    'draft-latex',
]

sphinx_migrations = [
# The elements of the tuples in the ``sphinx_migrations`` list are:
#     0. ``target``: the name of the target.
#     1. ``dependency``: the name of the dependency. ``None`` is
#        acceptable.
#
#   (target, dependency),
    ('source/about.txt', None),
    ('$(branch-output)/dirhtml', 'dirhtml'),
    ('$(branch-output)/html', 'html'),
    ('$(branch-output)/singlehtml', 'singlehtml')
]
