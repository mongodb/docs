#!/usr/bin/python

import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

from makefile_builder import MakefileBuilder
from builder_data import migrations

m = MakefileBuilder()

def build_all_migrations(migrations):
    m.comment('targets to migrate all content to the production staging directory..', block='header')
    m.newline(block='header')

    for migration in migrations:
        dependency = migration[0].rsplit('/', 1)[0]
        block=migration[2]

        m.target(target=migration[0],
                 dependency=migration[1],
                 block=block)
        m.job('mkdir -p ' + dependency, block=block)
        m.job('cp $< $@', block=block)
        m.msg('[build]: migrated $@', block=block)
        m.newline(block=block)


def main():
    build_all_migrations(migrations)

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify production migrations.')

if __name__ == '__main__':
    main()
