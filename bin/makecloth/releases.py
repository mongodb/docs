#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from makecloth import MakefileCloth

m = MakefileCloth()

def build_all_install_guides(releases):
    m.comment('to render the install guides properly, we have to bake in the version number.', block='header')
    m.newline(block='header')

    for build in releases['source-files']:
        makefile_core(build)

    # Disabled because the dependency.py builder does a better job of this.
    # for build in releases['install-guides']:
    #     makefile_restat(build['target'], build['dependency'])

    for build in releases['subscription-build']:
        makefile_subscription(build['type'], build['system'])

    m.comment('integration target for the installation guides:', block='meta')

    m.target(target='.PHONY',
             dependency='installation-guides $(installation-sources) $(installation-guides)',
             block='meta')

    m.newline(block='meta')
    m.target(target='installation-sources',
             dependency='$(installation-sources)', block='meta')

    m.job('git update-index --assume-unchanged $(installation-sources)', ignore=True, block='meta')
    m.msg('[build]: cleansing git index of installation sources.', block='meta')

    m.newline(block='meta')
    m.target(target='installation-guides',
             dependency='installation-sources $(installation-guides)',
             block='meta')

def makefile_core(builder):
    # this is one of the included source files.
    target = 'source/includes/install-curl-release-' + builder + '.rst'

    m.append_var(variable='installation-sources',
                 value=target,
                 block='source')
    m.target(target=target, dependency=None, block='source')
    m.job('$(PYTHONBIN) bin/rstcloth/releases.py %s %s %s' % (builder, 'core', target), block='source')
    m.msg('[build]: \(re\)generated $@.', block='source')
    m.newline(block='source')

# Commented because the dependency.py build probably does this better. 
# 
# def makefile_restat(builder, dependency):
#     # this is an installation guide.
#     target = builder
#     m.append_var(variable='installation-guides', value=target, block='guide')
#     m.target(target=target, dependency=dependency, block='guide')

#     if builder == 'source/tutorial/install-mongodb-subscriber-edition.txt':
#         pass
#     else:
#         m.job('touch $@', block='guide')

#     m.msg('[build]: touched $@ to ensure a clean build.', block='guide')
#     m.newline(block='guide')

def makefile_subscription(builder, release):
    target = 'source/includes/install-curl-release-ent-' + release + '.rst'

    m.append_var(variable='installation-sources',
                 value=target,
                 block='ent')
    m.target(target=target, dependency=None, block='ent')
    m.job('$(PYTHONBIN) bin/rstcloth/releases.py %s %s $@' % (builder, release), block='ent')
    m.msg('[build]: \(re\)generated $@.', block='ent')
    m.newline(block='ent')


def main():
    conf_file = utils.get_conf_file(__file__)
    build_all_install_guides(utils.ingest_yaml(conf_file))

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify install guides.')

if __name__ == '__main__':
    main()
