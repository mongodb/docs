#!/usr/bin/python

import sys
from makefile_builder import MakefileBuilder
from builder_data import sphinx_migrations as migrations

m = MakefileBuilder()

def build_all_sphinx_migrations(migrations):
    m.comment('targets to establish to ensure clean builds and sphinx content.', block='header')
    m.newline(block='header')

    for migration in migrations:
        if migration[1] is None:
            block='content'
        else:
            block='build'

        m.target(target=migration[0],
                 dependency=migration[1],
                 block=block)
        m.job('touch $@', block=block)
        m.msg('[build]: touched $@ to ensure proper migration', block=block)
        m.newline(block=block)

def main():
    build_all_sphinx_migrations(migrations)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify sphinx migrations.')

if __name__ == '__main__':
    main()
