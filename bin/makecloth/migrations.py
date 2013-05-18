#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from makecloth import MakefileCloth

m = MakefileCloth()

def build_all_migrations(migrations):
    m.comment('targets to migrate all content to the production staging directory..', block='header')
    m.newline(block='header')

    for migration in migrations:
        dependency = migration['source'].rsplit('/', 1)[0]
        block=migration['type']

        m.target(target=migration['target'],
                 dependency=migration['source'],
                 block=block)
        m.job('mkdir -p ' + dependency, block=block)
        m.job('cp $< $@', block=block)
        m.msg('[build]: migrated $@', block=block)
        m.newline(block=block)


def main():
    conf_file = utils.get_conf_file(__file__)
    build_all_migrations(utils.ingest_yaml(conf_file))

    m.write(sys.argv[1])

    print('[meta-build]: built "' + sys.argv[1] + '" to specify production migrations.')

if __name__ == '__main__':
    main()
